import React, { useEffect, useState } from 'react';
import { getRandomQuotes } from '../page/quotes';

const now = new Date();
const currentDate = now.toDateString();

const Dash = ({ pendingCount, completedCount }) => {
  const [quotes, setQuotes] = useState('');

  useEffect(() => {
    setQuotes(getRandomQuotes());
  }, []);

  const getNewQuote = () => {
    setQuotes(getRandomQuotes());
  };

  return (
    <>
      <div>
        <div id="dash-area" className='h-auto w-auto m-5 p-5 '>
          <div id="title"><h1 className='text-slate-300 text-xl font-Poppins font-thin'>Master Your Tasks Like a Pro</h1></div>

          <div id="inner-dash" className='h-auto w-auto m-3 p-3 flex justify-between items-end'>

            <div id="pending-card" className='h-60 w-60 bg-red-800 hover:bg-red-700 shadow-slate-950 shadow-xl rounded-md m-5 pt-3 pb-5 flex flex-col justify-between'>
              <div className='h-auto w-full p-3'><h1 className='text-white text-center text-xl font-Poppins'>You Have</h1></div>
              <div><h1 className='text-white text-center text-7xl font-bold font-Poppins'>{pendingCount}</h1></div>
              <div><h1 className='text-white text-center'>Pending Task{pendingCount !== 1 ? 's' : ''}</h1></div>
            </div>

            <div id="complete-card" className='h-60 w-60 bg-green-800 hover:bg-green-700 shadow-slate-950 shadow-xl rounded-md m-5 pt-3 pb-5 flex flex-col justify-between'>
              <div className='h-auto w-full p-3'><h1 className='text-white text-center'>You Have</h1></div>
              <div><h1 className='text-white text-center text-7xl font-bold font-Poppins'>{completedCount}</h1></div>
              <div><h1 className='text-white text-center'>Completed Task{completedCount !== 1 ? 's' : ''}</h1></div>
            </div>

            <div id="widget-card" className='h-80 w-60 bg-zinc-800 shadow-slate-950 shadow-xl rounded-md m-5 pt-3 pb-4 flex flex-col justify-between'>            
              <div><h1 className='text-white text-lg text-center font-Poppins'>{currentDate}</h1></div>
              <div className='p-4 font-thin italic font-Poppins'><p className='text-slate-200'>{quotes}</p></div>
              <button className="p-2 text-white flex items-center justify-center space-x-1 bg-slate-600 hover:bg-slate-500 " onClick={getNewQuote}>                
                <span>Get New Quote</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dash;
