"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import Head from "next/head";

// Lazy load components
const LazyDashboard = lazy(() => import("../app/page/dash"));
const LazyAddTask = lazy(() => import("../app/page/add"));
const LazyPendingTask = lazy(() => import("../app/page/pending"));
const LazyCompletedTask = lazy(() => import("../app/page/complete"));

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [content, setContent] = useState(<LazyDashboard pendingCount={tasks.length} completedCount={completedTasks.length} />);
  const [activeButton, setActiveButton] = useState("dash");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  const pendingCount = tasks.length;
  const completedCount = completedTasks.length;

  const handleButtonClick = (Component, buttonActive) => {
    let component;
    if (buttonActive === "add") {
      component = <Component addTaskHandler={addTaskHandler} />;
    } else if (buttonActive === "pending") {
      component = (
        <Component
          tasks={tasks}
          deleteTaskHandler={deleteTaskHandler}
          completeTaskHandler={completeTaskHandler}
        />
      );
    } else if (buttonActive === "complete") {
      component = (
        <Component
          completedTasks={completedTasks}
          deleteTaskHandler={(index) => deleteTaskHandler(index, true)}
          clearLocalStorage={clearLocalStorage} 
        />
      );
    } else {
      component = (
        <Component
          pendingCount={pendingCount}
          completedCount={completedCount}
        />
      );
    }
    setContent(component);
    setActiveButton(buttonActive);
  };

  const addTaskHandler = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTaskHandler = (index, isCompleted = false) => {
    const taskList = isCompleted ? completedTasks : tasks;
    const updatedTasks = taskList.filter((task, i) => i !== index);
    if (isCompleted) {
      setCompletedTasks(updatedTasks);
      localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    } else {
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const completeTaskHandler = (index) => {
    const taskToComplete = tasks[index];
    const updatedTasks = tasks.filter((task, i) => i !== index);
    const updatedCompletedTasks = [...completedTasks, taskToComplete];
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
  };

  const clearLocalStorage = () => {
    // localStorage.removeItem("tasks");
    localStorage.removeItem("completedTasks");
    // setTasks([]);
    setCompletedTasks([]);
  };
 

  useEffect(() => {
    setContent(<LazyDashboard pendingCount={pendingCount} completedCount={completedCount} />);
  }, [pendingCount, completedCount]);


  return (
    <>
      <Head>
        <title>To-Do List</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Playwrite+PT:wght@100..400&display=swap" rel="stylesheet"/> 
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <main className="flex bg-slate-950 min-h-screen h-full sm:h-auto min-w-auto w-full">
        <div id="left" className="min-h-screen h-full sm:h-auto w-80 bg-slate-900 flex flex-col relative">
          <nav className="h-28 w-full flex justify-center">
            <div className="h-28 w-28 mt-4">
              <img src="/logo/logo-todo.jpg" alt="logo" draggable="false" />
            </div>
          </nav>
          <h1 className="text-white text-center font-bold mt-1">Task Master</h1>

          <div id="work" className="h-auto w-full mt-14 flex flex-col p-3">
            <button id="dash" className={`px-2 py-2 text-white rounded-full border-slate-200 border-solid border-2 hover:bg-orange-600 mb-7 ${activeButton === 'dash' ? 'bg-orange-700' : ''}`}
              onClick={() => handleButtonClick(LazyDashboard, "dash")}>Dashboard</button>

            <button id="add" className={`px-2 py-2 text-white rounded-full border-slate-200 border-solid border-2 hover:bg-sky-600 mb-7 ${activeButton === 'add' ? 'bg-sky-700' : ''}`}
              onClick={() => handleButtonClick(LazyAddTask, "add")}>Add Task</button>

            <button id="pending" className={`px-2 py-2 text-white rounded-full border-slate-200 border-solid border-2 hover:bg-red-600 mb-7 ${activeButton === 'pending' ? 'bg-red-700' : ''}`}
              onClick={() => handleButtonClick(LazyPendingTask, "pending")}>Pending Task</button>

            <button id="complete" className={`px-2 py-2 text-white rounded-full border-slate-200 border-solid border-2 hover:bg-green-600 mb-7 ${activeButton === 'complete' ? 'bg-green-700' : ''}`}
              onClick={() => handleButtonClick(LazyCompletedTask, "complete")}>Completed Task</button>
          </div>
          <div className="bottom-0 absolute w-full flex justify-center items-center mb-3"><h6 className="text-slate-500 font-bold font-Josefin text-sm">Developed by Sujit Das</h6></div>
        </div>

        <div id="right" className="min-h-screen h-full w-full bg-transparent">
          {/* TOP NAV AREA */}
          <div id="top" className="h-16 w-full flex items-center justify-between px-5">
            <div id="top-left" className="w-full ">
              <div className=" absolute top-0 "><h1 className="text-slate-800 font-extrabold text-8xl">TASK MASTER</h1></div>              
            </div>
            <div id="top-right">
              <button className="hidden text-white px-3 py-1 bg-red-500 border-solid border-2 rounded-full hover:bg-red-600">Logout</button>
            </div>
          </div>
          {/* BOTTOM AREA */}
          <div id="bottom" className="min-h-[calc(100vh-64px)] h-auto w-full p-5">
            <div id="inner-bottom" className="h-full w-full bg-slate-900 shadow-slate-950 shadow-md rounded">
              <Suspense fallback={<div>Loading...</div>}>{content}</Suspense>
            </div>
          </div>
        </div>        
      </main>     
    </>
  );
};

export default Page;
