import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../pocketbase';

export default function EditTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title) {
        alert('Please enter the title');
        return;
    }

    try {
        await updateTask(id, title, description);
        navigate("..");
    } catch (error) {
        console.error('Failed to update task:', error.message);
        alert('Failed to update task');
    }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Edit Task</h2>

      <input 
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input 
        type="text" 
        placeholder="Description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required 
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex justify-between items-center">
        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 mr-2"
          >
            <path 
              fillRule="evenodd" 
              d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" 
              clipRule="evenodd" 
            />
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}
