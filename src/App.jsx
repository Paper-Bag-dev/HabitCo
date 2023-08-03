import { useState } from 'react'
import LeftCol from './leftcol'
import Calendar from './calendar'
function App() {
  return (
    <div className=" w-screen h-screen bg-black flex overflow-hidden text-slate-50">
      <div className="left panel bg-[#2F2F2F] w-80 left-0 h-screen">
        <LeftCol />
      </div>
      
      <Calendar />

    <div className=" right panel absolute right-0 bg-[#2F2F2F] w-16 h-screen">
        right bar
      </div>
    </div>
  )
}

export default App
