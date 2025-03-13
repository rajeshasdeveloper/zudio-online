import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

function ToDo() {
    const [task, setTask] = useState('');
    const [newTask, setNewTask] = useState([]);
    const [editTask, setEditTask] = useState([]);

    // useEffect(() => {});

    const handleChange = (event) => {
        setTask(event.target.value);
    };

    const handleNewChange = (event) => {
        setEditTask(event.target.value);
    };

    const addTask = () => {
        if (task.trim() !== '') {
            setNewTask((t) => [...newTask, task]);
            setTask('');
        }
    };

    const deleteTask = (index) => {
        const deletedTask = newTask.filter((element, i) => i !== index);
        setNewTask(deletedTask);
    };

    const editedTask = (idx) => {
        // const existingTasks = newTask;
        // existingTasks[index] = editTask;
        setNewTask((ets) => {
            ets[idx] = editTask;
            return ets;
        });
        // setTask('');
    };

    return (
        <>
            <div className='w-full text-center justify-items-center'>
                <h1 className='w-full text-3xl font-bold text-center border-gray pb-4 border-b-2'>
                    TODO LIST
                </h1>
                <hr></hr>
                <div className='w-full flex flex-col py-4 gap-4'>
                    <input
                        placeholder='add item...'
                        type='text'
                        onChange={handleChange}
                        value={task}
                        className='border-2 rounded-md border-black'
                    ></input>
                    <button
                        onClick={addTask}
                        className='border-2 border-black w-[50px] bg-black text-white rounded-md'
                    >
                        ADD
                    </button>
                </div>
                <ul>
                    {newTask.map((tasks, index) => (
                        <li
                            key={index}
                            className='border-2 border-gray bg-gray-200 text-black flex flex-row gap-12 p-2 w-[400px]'
                        >
                            <span className='w-[300px] text-left'>{tasks}</span>
                            <div className='flex flex-row gap-2 justify-end'>
                                <button
                                    onClick={() => {
                                        deleteTask(index);
                                    }}
                                    className='border-2 border-white hover:border-gray-400 bg-white hover:bg-gray-400 text-black rounded-md px-4'
                                >
                                    DELETE
                                </button>
                                <Popup
                                    trigger={
                                        <button className='border-2 border-white hover:border-gray-400 bg-white hover:bg-gray-400 text-black rounded-md px-4'>
                                            EDIT
                                        </button>
                                    }
                                    position='right center'
                                >
                                    {(close) => (
                                        <div className='flex flex-col gap-4 border-2 border-gray bg-white p-4'>
                                            <div className=''>
                                                <p>Edit the todo:</p>
                                                <input
                                                    placeholder={tasks}
                                                    type='text'
                                                    onChange={handleNewChange}
                                                    // value={editTask}
                                                    className='border-2 border-orange-400 rounded-md '
                                                ></input>
                                            </div>
                                            <div className='flex justify-end'>
                                                <button
                                                    onClick={() => close()}
                                                    className='border-2 border-black w-[70px] bg-black text-white mx-2 px-2 rounded-md'
                                                >
                                                    cancel
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        e.preventDefault()
                                                        editedTask(index);
                                                        close();
                                                    }}
                                                    className='border-2 border-orange-400 w-[50px] bg-orange-400 text-black rounded-md'
                                                >
                                                    ok
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ToDo;
