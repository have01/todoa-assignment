import React, { useState } from 'react'
import { db } from '../db/FirebaseConfig';

const TodoForm = ({ isModalOpen, openModal, setIsModalOpen, taskEdit }) => {
    const [todoInput, setTodoInput] = useState({
        title: "",
        description: "",
        status: "",
        dueDate: "",
        reminder: "",
    });
    const fieldConfigs = [
        { label: 'Title', type: 'text', name: 'title', required: true },
        { label: 'Description', type: 'textarea', name: 'description', required: true },
        { label: 'Status', type: 'text', name: 'status', required: true },
        { label: 'Due Date', type: 'date', name: 'dueDate', required: true },
        { label: 'Reminder', type: 'datetime-local', name: 'reminder', required: true },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTodoInput((prevTodo) => ({
            ...prevTodo,
            [name]: value,
        }));
    };

    const addTodo = (e) => {
        e.preventDefault()
        db.collection("todos").add(todoInput);
        setTodoInput({
            title: "",
            description: "",
            status: "",
            dueDate: "",
            reminder: "",
        });
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
                <div className="bg-white p-6 rounded shadow-lg w-96 min-h-[500px] flex flex-col">
                    <h1 className='text-black font-bold text-lg'>Add Task</h1>
                    <form onSubmit={addTodo}>
                        <label>Status:</label>
                        <select value={todoInput.status} name='status' onChange={(e) => handleChange(e)}>
                            <option value="ToDo">ToDo</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {fieldConfigs.map((config) => (
                            <label key={config.name} className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-bold">  {config.label}:</span>
                                </div>

                                {config.type === 'textarea' ? (
                                    <textarea
                                        className="textarea textarea-bordered h-24" placeholder="Bio"
                                        name={config.name}
                                        value={todoInput[config.name]}
                                        onChange={handleChange}
                                        required={config.required}
                                    />
                                ) : (
                                    <input
                                        className="input input-bordered w-full max-w-xs"
                                        type={config.type}
                                        name={config.name}
                                        value={todoInput[config.name]}
                                        onChange={handleChange}
                                        required={config.required}
                                    />
                                )}
                            </label>
                        ))}
                        <div className="mt-4 flex justify-end">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" type='submit'>
                                Add Task
                            </button>
                            <button className="ml-2 text-gray-600" onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TodoForm