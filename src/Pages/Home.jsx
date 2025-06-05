import { useState,  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, edit, toggleDone } from "../redux/slice";
import { BsFillClipboard2CheckFill } from "react-icons/bs";

import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdSaveAs } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import Head from "./Head";



function Home() {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const [tododata, setTododata] = useState("");
  const [editText, setEditText] = useState("");
  const [editingid, setEditingId] = useState(null);
  



  const handlerAdd = () => {
    if (tododata.trim().length > 1) {
      dispatch(add({ id: Date.now(), text: tododata }));
      setTododata("");
    }else{
      alert("Enter a task")
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSave = (id) => {
    if (editText.trim()) {
      dispatch(edit({ id, text: editText }));
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const enter = (e) => {
    if (e.key === "Enter") {
if (tododata.trim().length > 1) {
    dispatch(add({ id: Date.now(), text: tododata }));
      setTododata("");
}
    
    }
  };

  const handleDone = (id) => {
    dispatch(toggleDone({ id }));
  };

  return (
    <> 
       <Head />
   

       <div className="flex justify-center ">
         

      
      <div className="md:w-5/12 w-10/12 space-y-4">
      
        <h1 className="text-3xl md:text-3xl text-center  pt-10 font-bold drop-shadow  ">
       Task Management App
        </h1>

        <div className="flex  rounded-3xl p-2 drop-shadow outline-1 outline-gray-200">
          <input
            value={tododata}
            onChange={(e) => setTododata(e.target.value)}
            className="pl-4 border-none w-full outline-none  rounded-3xl"
            type="text"
            placeholder="Enter Task here...."
            onKeyDown={enter}
          />
          <button
            className="p-2 px-5 text-white bg-green-600 hover:bg-green-700 transition rounded-3xl"
            onClick={handlerAdd}
          >
            Add
          </button>
        </div>

        <div>
          {todo.map((todo) => {
            return (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              
                className="shadow-md rounded-3xl my-4"
              >
                {todo.done ? (
                  <div className=" relative rounded-3xl p-4 flex w-full space-x-3 bg-green-50">
                    <input
                      type="checkbox"
                      className="  bg-white border border-gray-400 peer-checked:bg-green-500 peer-checked:border-green-500"
                      checked={true}
                      onChange={() => handleDone(todo.id)}
                    />
                    <span className="opacity-50 line-through">{todo.text}</span>
                    <span className="absolute end-6 flex gap-2">
                      Completed
                      <BsFillClipboard2CheckFill className="translate-y-1 text-green-500" />
                    </span>
                  </div>
                ) : editingid != todo.id ? (
                  <div className="border-gray-100 border rounded-3xl p-2 relative flex place-items-center w-full gap-2 ">
                    <input
                      type="checkbox"
                      className="ml-2  "
                      checked={false}
                      onChange={() => handleDone(todo.id)}
                    />
                    <div className="md:w-9/12 max-w-7/12 align-middle py-2    ">
                    <p className="break-words">{todo.text}
                      </p>  
                    </div>
                    <div className="flex gap-2  md:end-2  absolute end-2 md:absolute  ">
                      <button
                        className="rounded-3xl  end-2 bg-blue-400 hover:bg-blue-600 transition text-white p-3 px-5"
                        onClick={() => handleEdit(todo)}
                      >
                       <FaRegEdit />
                      </button>
                      <button
                        className="rounded-3xl   bg-red-400 hover:bg-red-700 transition text-white p-2 px-5"
                        onClick={() => dispatch(remove({ id: todo.id }))}
                      >
                      <RxCross2 />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl p-2 w-full relative place-items-center outline outline-gray-500 ">
                    <input
                      type="text"
                      value={editText}
                      className="p-2 w-8/12  bg-white rounded-3xl focus:border-none focus:outline-none"
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="rounded-3xl absolute right-18 bg-green-400 text-white p-3 px-5"
                      onClick={() => handleSave(todo.id)}
                    >
                    <MdSaveAs />
                    </button>
                    <button
                      className="rounded-3xl absolute right-2 bg-red-400 text-white p-3 px-5 hover:bg-red-600 transition"
                      onClick={handleCancel}
                    >
                   <TbCancel />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    </>
 
  );
}

export default Home;
