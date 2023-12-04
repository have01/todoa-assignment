import React, { useState } from 'react'
import { db } from '../db/FirebaseConfig';

const FilterTodos = ({ setLoading, todoList, setFilteredTodos }) => {
    const [updateStatus, setUpdateStatus] = useState("");

    const filterValues = [
        { status: "completed", value: "completed" },
        { status: "Incomplete", value: "Incomplete" }
    ]
    const sortBy = async (text) => {
        setLoading(false)
        const todoCollection = db.collection("todos");
        let updatedTodos = [];
        if (text === "All") {
            updatedTodos = todoList;
        } else {
            const snapshot = await todoCollection.where('status', '==', text).get();
            updatedTodos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        }
        setFilteredTodos(updatedTodos);
        setLoading(true)
    };
    return (
        <>
            <select
                value={updateStatus} // assuming updateStatus is the selected status
                onChange={(e) => sortBy(e.target.value)}
                className="bg-gray-50  text-gray-900 text-sm rounded-lg block w-full px-4 py-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="All">All task</option>
                {filterValues.map((todo) => (
                    <option key={todo.status} value={todo.status}>
                        {todo.status}
                    </option>
                ))}
            </select>
        </>
    )
}

export default FilterTodos