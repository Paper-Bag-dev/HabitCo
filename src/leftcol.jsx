import React from 'react'
import Line from './line'
import LeftColHead from './leftcolhead'
import TodoList from './todolist'

const LeftCol = () => {
  return (
    <div className=" text-slate-100 font-sans text-4xl flex-col justify-center w-full">
        <LeftColHead />
        <TodoList />
    </div>
    
  )
}

export default LeftCol