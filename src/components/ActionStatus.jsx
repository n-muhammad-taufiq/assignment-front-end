import React from 'react'

const ActionStatus = ({actionStatus}) => {
  return (
    <div className={`fade-in flex fixed top-0 left-0 right-0 text-emerald-400 font-bold text-xs py-3 justify-center z-50 bg-white border-b border-b-gray-200`}>
    {actionStatus}
    </div>
  )
}

export default ActionStatus
