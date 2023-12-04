import { useEffect, useState } from 'react';
import { db } from '../db/FirebaseConfig'; // Replace with your actual Firebase config import

const useFetchTodos = () => {
    const [loading, setLoading] = useState(true);
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const fetchTodos = db.collection("todos").onSnapshot((snapshot) => {
            setLoading(false);
            const updatedTodos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodoList(updatedTodos);
            setLoading(true);
        });

        // Cleanup function
        return () => {
            fetchTodos();
        };
    }, []);

    return { loading, todoList, setTodoList };
};

export default useFetchTodos;
