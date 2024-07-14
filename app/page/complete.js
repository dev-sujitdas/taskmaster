import React from 'react';



const Complete = ({ completedTasks, clearLocalStorage }) => {
  return (
    <div className="h-auto py-2 px-5 mt-5 flex justify-center flex-col items-center">
      <div className='w-full flex justify-end'><button className='p-2  text-red-500' onClick={clearLocalStorage}>Clear All</button></div>
      <div className="h-[28rem] overflow-auto w-full">
        {completedTasks.length > 0 ? (
          completedTasks.map((t, i) => (
            <div key={i} id="taskContent" className="h-auto w-[98%] bg-slate-700 p-3 mb-3 rounded-md">
              <div id="date">
                <span className="font-thin text-slate-300"> {t.date} </span>
              </div>
              <div id="title" className="h-auto w-full font-Josefin text-lg font-semibold text-white">
                {t.title}
              </div>
              <div id="description">
                <p className='text-slate-300 font-extralight'> {t.description} </p>
              </div>
              <div id='taskBottom' className='flex h-7 w-full mt-3'>
                <div id="t-left" className='w-1/2'></div>
                <div id="t-right" className='w-1/2 flex justify-end'>
                  <div><h4 className='text-slate-400 text-sm font-light'>Completed</h4></div>
                  
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>No Completed Task Available</h2>
        )}
      </div>
    </div>
  );
};

export default Complete;
