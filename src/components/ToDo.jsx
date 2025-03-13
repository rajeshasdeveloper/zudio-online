import React, { useState } from 'react';
// import Popup from 'reactjs-popup';

function ToDo() {
    const [task, setTask] = useState('');
    const [newTask, setNewTask] = useState([]);
    const [editTaskValue, setEditTaskValue] = useState({
        value: '',
        idx: '',
    });
    const [enableInput, setEnableInput] = useState(false);

    // useEffect(() => {});

    const handleChange = (event) => {
        setTask(event.target.value);
    };

    // const handleNewChange = (event) => {
    //     setEditTaskValue(event.target.value);
    // };

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

    const updateEditedTaskValue = () => {
        setNewTask((ets) => {
            ets[editTaskValue.idx] = editTaskValue.value;
            return ets;
        });
    };

    const enableEditInput = (currentValue = '', idx) => {
        setEditTaskValue({ value: currentValue, idx: idx });
        setEnableInput(!enableInput);
    };

    const enableEditingValueFunction = () => {
        return enableInput ? (
            <div>
                <p>Edit the todo:</p>
                <input
                    type='text'
                    placeholder={editTaskValue.value}
                    onChange={(e) =>
                        setEditTaskValue((prev) => ({
                            ...prev,
                            ...{ value: e.target.value },
                        }))
                    }
                ></input>
                <br />
                <button
                    onClick={() => {
                        setEnableInput(!enableInput);
                    }}
                >
                    cancel
                </button>
                <br />
                <button
                    onClick={() => {
                        updateEditedTaskValue();
                        setEnableInput(!enableInput);
                    }}
                >
                    ok
                </button>
            </div>
        ) : (
            <></>
        );
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
                                <button
                                    className='border-2 border-white hover:border-gray-400 bg-white hover:bg-gray-400 text-black rounded-md px-4'
                                    onClick={() =>
                                        enableEditInput(tasks, index)
                                    }
                                >
                                    EDIT
                                </button>
                            </div>
                        </li>
                    ))}
                    {enableEditingValueFunction()}
                </ul>
            </div>
        </>
    );
}

export default ToDo;
