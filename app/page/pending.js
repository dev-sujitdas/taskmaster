import React, { useEffect, useState } from 'react';

const PendingTask = ({ tasks, deleteTaskHandler, completeTaskHandler }) => {
  const [renderTask, setRenderTask] = useState(<h2 className='text-slate-300 text-xl'>No Task Available</h2>);
  
  

  useEffect(() => {
    if (tasks.length > 0) {
      setRenderTask(
        tasks.map((t, i) => (
          <div key={i} id="taskContent" className="h-auto w-[98%] bg-slate-700 p-3 mb-3 rounded-md">
            <div id="date">
              <span className="font-thin text-slate-300"> {t.date} </span>
            </div>
            <div id="title" className="h-auto w-full font-Josefin text-lg font-semibold text-white"> {t.title} </div>
            <div id="description">
              <p className='text-slate-300 font-extralight'> {t.description} </p>
            </div>
            <div id='taskBottom' className='flex h-7 w-full mt-3'>
              <div id="t-left" className='w-1/2'></div>
              <div id="t-right" className='w-1/2  flex justify-end'>
                <button
                  id='markComplete'
                  className='px-2 bg-green-600 hover:bg-green-700 rounded-md font-Josefin font-light text-white'
                  onClick={() => completeTaskHandler(i)}
                >
                  Mark Complete
                </button>
                <button
                  id='delete'
                  className='px-2 bg-red-600 hover:bg-red-700 font-Josefin font-light rounded-md mr-2 ml-3 text-white'
                  onClick={() => deleteTaskHandler(i)}                
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      );
    } else {
      setRenderTask(<h2 className='text-slate-300 text-xl'>No Task Available</h2>);
    }
  }, [tasks, deleteTaskHandler, completeTaskHandler]);

  return (
    <div className="h-auto p-5 mt-5 flex justify-center flex-col items-center">
      <div className="h-[28rem] overflow-auto w-full">
        {renderTask}
      </div>
    </div>
  );
};

export default PendingTask;
