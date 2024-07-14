import React, { useState } from 'react';

const AddTask = ({ addTaskHandler }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaskHandler( {date, title, description}  );
    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <div id="addtask-area" className='h-auto w-auto m-5 p-5'>
      <div id="title">
        <h1 className='text-slate-300 text-xl font-Poppins font-thin capitalize'>Add your task here...</h1>
      </div>
      <div id="inner-add" className='h-auto w-auto m-3 p-3 flex justify-center'>
        <div id="taskform" className='h-auto w-1/2 flex flex-col gap-7'>
          <input
            id='task-title'
            type="text"
            placeholder='Enter your task title'
            className='px-2 py-2 rounded-md bg-slate-200'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="task-date"
            type="date"
            name="Date"
            className='px-2 py-2 rounded-md bg-slate-200'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            id="Message"
            name="message"
            rows="5"
            placeholder="&nbsp;Enter your task description..."
            className='px-2 py-2 rounded-md bg-slate-200'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            id="Send"
            type="submit"
            className='w-full bg-slate-600 hover:bg-slate-500 px-2 py-2 rounded-md text-white font-bold font-Poppins'
            onClick={handleSubmit}
          >
            ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
