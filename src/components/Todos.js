import { MdDeleteForever } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { db } from "../db/FirebaseConfig";
import Loader from "../components/Loader";

const Todos = ({ todoList, deleteTodo, loading }) => {
    const updateStatus = (id, status) => {
        db.collection("todos").doc(id).update({
            status: status === "Completed" ? "Incomplete" : "Completed"
        });
    };
    return (
        <>
            <div className="  w-full  flex flex-wrap mx-auto">
                {loading ? todoList?.map(task => {
                    const { id, title, description, status } = task
                    return (
                        <div key={id}
                            className=" w-[300px] bg-white m-2 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent flex-col  ">
                            <div className="">
                                <h2 className="card-title my-1">{title}</h2>
                                <div className="w-full max-h-[200px] overflow-y-auto">
                                    <p className="">
                                        {description}
                                    </p>
                                </div>
                                <div className="card-actions mt-2 flex w-full justify-between items border-t-2 border-dashed border-slate-950 pt-4">
                                    <button className="badge badge-accent p-3" onClick={() => updateStatus(id, status)}>{status}</button>
                                    <div className="flex flex-row justify-around items-center">
                                        <CiStar size={25} />
                                        <button type="button" onClick={() => deleteTodo(task.id)}>   <MdDeleteForever size={25} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : <Loader />}
            </div>
        </>
    )
}

export default Todos