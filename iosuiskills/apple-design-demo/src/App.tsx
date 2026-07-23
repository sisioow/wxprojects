import { useState } from 'react'
import { BottomSheet } from './components/BottomSheet'
import { PressButton } from './components/PressButton'
import './App.css'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="app">
      <main className="hero">
        <p className="brand">Apple Design Demo</p>
        <h1>流体底部弹层</h1>
        <p className="lede">
          基于 emilkowalski/skills 的 apple-design：按下即时反馈、1:1
          跟手、惯性投影与可打断弹簧。
        </p>
        <PressButton onClick={() => setOpen(true)}>打开底部弹层</PressButton>
      </main>

      <BottomSheet open={open} onOpenChange={setOpen} title="设置">
        <p>
          拖动手柄或面板：跟手移动，甩开时按速度投影到打开/关闭，边界有橡皮筋阻尼。动画进行中可再次抓住打断。
        </p>
        <ul className="checklist">
          <li>Response：按下缩放反馈</li>
          <li>Direct manipulation：grab offset + pointer capture</li>
          <li>Momentum projection：Apple decelerationRate</li>
          <li>Materials：backdrop-filter 毛玻璃层级</li>
        </ul>
      </BottomSheet>
    </div>
  )
}

export default App
