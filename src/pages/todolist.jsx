import React, { useEffect, useState } from 'react';
import { client, DeleteTask, getTasks, toggelTask } from '../pocketbase';
import { Link } from 'react-router-dom';

export default function Todolist() {
    const [Tasks, setTasks] = useState([]);
    const [completed,setCompleted] = useState(false);
     const handleCompleted = () =>{
        setCompleted(!completed)
        toggelTask(task.title,completed)
     }
    useEffect(() => {
        getTasks()
            .then(res => setTasks(res))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <>
            <div className="max-w-lg mx-auto mt-10">
                {Tasks.map(task => (
                    <div key={task.id} className="flex items-start p-4 mb-4 bg-white rounded-lg shadow-md">
                        <input 
                            type="checkbox" 
                            name="completed" 
                            defaultChecked = {task.completed}
                            onChange={handleCompleted}
                            className="mr-4 mt-1 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold text-gray-900">{task.Title}</h1>
                            <h4 className="text-sm text-gray-600">{task.Description}</h4>
                        </div>
                        <div className="flex space-x-2 ml-4">
                            <Link to={`edit/${task.id}`}>
                            <button 
                                className="text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded"
                                aria-label="Edit Task"
                            >
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            </Link>
                            <button 
                                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 p-2 rounded"
                                aria-label="Delete Task"
                            >
                                <span className="material-symbols-outlined" onClick={()=>DeleteTask(task.id)}>delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <Link to="create">
                    <button className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Task
                    </button>
                </Link>
            </div>
        </>
    );
}
