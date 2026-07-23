import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { animate } from 'motion'
import {
  estimateVelocity,
  resolveSheetTarget,
  rubberbandClamp,
  type PointerSample,
} from '../lib/physics'
import './BottomSheet.css'

type BottomSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  title?: string
}

export function BottomSheet({
  open,
  onOpenChange,
  children,
  title = 'Sheet',
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const yRef = useRef(0)
  const heightRef = useRef(420)
  const draggingRef = useRef(false)
  const grabOffsetRef = useRef(0)
  const samplesRef = useRef<PointerSample[]>([])
  const [scrimOpacity, setScrimOpacity] = useState(0)
  const stopAnimRef = useRef<(() => void) | null>(null)

  const applyY = useCallback((y: number) => {
    const el = sheetRef.current
    if (!el) return
    yRef.current = y
    el.style.transform = `translate3d(0, ${y}px, 0)`
    const h = heightRef.current || 1
    setScrimOpacity(Math.max(0, Math.min(1, 1 - y / h)) * 0.45)
  }, [])

  const springTo = useCallback(
    (target: number, velocity = 0) => {
      stopAnimRef.current?.()
      const from = yRef.current
      const controls = animate(from, target, {
        type: 'spring',
        bounce: Math.abs(velocity) > 400 ? 0.2 : 0,
        duration: 0.35,
        velocity,
        onUpdate: (latest) => applyY(latest),
      })
      stopAnimRef.current = () => controls.stop()
      void controls.then(() => {
        applyY(target)
        onOpenChange(target < heightRef.current * 0.5)
      })
    },
    [applyY, onOpenChange],
  )

  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    const measure = () => {
      heightRef.current = el.offsetHeight
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = sheetRef.current
    const h = heightRef.current || el?.offsetHeight || 420
    heightRef.current = h
    if (open) {
      if (yRef.current <= 0 || yRef.current >= h - 1) {
        applyY(h)
      }
      springTo(0, 0)
    } else if (yRef.current < h - 1) {
      springTo(h, 0)
    } else {
      applyY(h)
    }
    // open drives enter/exit springs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = sheetRef.current
    if (!el || !open) return
    stopAnimRef.current?.()
    draggingRef.current = true
    el.setPointerCapture(e.pointerId)
    const rect = el.getBoundingClientRect()
    grabOffsetRef.current = e.clientY - rect.top
    samplesRef.current = [{ y: e.clientY, t: e.timeStamp }]
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const h = heightRef.current
    const top = window.innerHeight - h
    const raw = e.clientY - grabOffsetRef.current - top
    applyY(rubberbandClamp(raw, 0, h, h))
    const samples = samplesRef.current
    samples.push({ y: e.clientY, t: e.timeStamp })
    if (samples.length > 8) samples.shift()
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    samplesRef.current.push({ y: e.clientY, t: e.timeStamp })
    const velocity = estimateVelocity(samplesRef.current)
    const h = heightRef.current
    const target = resolveSheetTarget(yRef.current, velocity, [0, h])
    springTo(target, velocity)
  }

  return (
    <div className="sheet-root">
      <button
        type="button"
        className="sheet-scrim"
        style={{
          opacity: scrimOpacity,
          pointerEvents: open || scrimOpacity > 0.02 ? 'auto' : 'none',
        }}
        aria-label="关闭弹层"
        onClick={() => springTo(heightRef.current, 0)}
      />
      <div
        ref={sheetRef}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="sheet-handle" />
        <header className="sheet-header">
          <h2>{title}</h2>
        </header>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  )
}
