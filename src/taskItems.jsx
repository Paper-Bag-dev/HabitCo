import React from 'react'

const TaskItems = (props) => {
  return (
    <div>
        <input type="checkbox" className=" bg-slate-800 w-6 h-6" /> {props.item} <button className=" bg-[#444444] ml-12 px-2 rounded-lg">O</button>
    </div>
  )
}

export default TaskItems