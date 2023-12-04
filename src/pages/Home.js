import React, { useState, useEffect } from "react";
import { db } from "../db/FirebaseConfig";
import TodoForm from "../components/TodoForm";
import TodosList from "../components/Todos";
import useFetchTodos from "../hooks/useFetchTodos";
import FilterTodos from "../components/FilterTodos";

const Home = () => {
    const { todoList, setTodoList } = useFetchTodos();
    const [updateStatus, setUpdateStatus] = useState("");
    const [updateTodoId, setUpdateTodoId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskEdit, setTaskEdit] = useState(null);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [loading, setLoading] = useState([]);


    const openModal = (task) => {
        setTaskEdit(task);
        setIsModalOpen(true);
    };

    const deleteTodo = (id) => {
        db.collection("todos").doc(id).delete();
    };

    const startUpdateTodo = (id, status) => {
        setUpdateTodoId(id);
        setUpdateStatus(status);
    };


    return (
        <>
            <div className="w-full p-2 flex justify-between">
                <div>
                    <button className="flex px-10 justify-center items-center overflow-hidden text-white bg-gray-900 rounded group" onClick={openModal}>
                        {/* <IoIosAddCircleOutline size={20} /> */}
                        <span className="px-1 py-2.5">Add Task</span>
                    </button>

                </div>
                <div>
                    <FilterTodos
                        setFilteredTodos={setFilteredTodos}
                        todoList={todoList}
                        setLoading={setLoading}
                    />
                </div>
            </div>
            <TodoForm
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                taskEdit={taskEdit} />
            {/* ... Your JSX for buttons and dropdown */}
            {/* Example of how you might use the filteredTodos in the TodosList component */}
            <TodosList
                startUpdateTodo={startUpdateTodo}
                todoList={filteredTodos.length > 0 ? filteredTodos : todoList}
                deleteTodo={deleteTodo}
                openModal={openModal}
                loading={loading}
            />
        </>
    );
};

export default Home;
