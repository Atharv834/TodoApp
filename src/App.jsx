import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { stringify, v4 as uuidv4 } from 'uuid';


function App() {

  const [todo,setTodo] = useState("")
  const [todos,setTodos] = useState([])
  const [showFinished,setshowFinished] =useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  },[])

  const saveToLS = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

const toggleFinished=(e)=>{
 setshowFinished(!showFinished)
}

  const handleEdit =(e,id)=>{
    let t = todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    let newTodos= todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

  }
  const handleDelete = (e,id) => {

    let newTodos= todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()


  }
  const handleAdd =()=>{

    setTodos([...todos,{id:uuidv4(), todo ,isCompleted:false}])
    setTodo("")
    console.log(todos)
    saveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name;
    let index=todos.findIndex(item =>{
      return item.id===id;
    })

    let newTodos=[...todos];
    newTodos[index].isCompleted =!newTodos[index].isCompleted 
    setTodos(newTodos)
    saveToLS()

  }

  return (
    <>
      <Navbar />
      <div className="container mx-7 my-4 rounded-xl p-5 bg-violet-100 min-h-[80vh]">


        <div className="addTodo my-4">
          <h2 className="text-lg font-bold"> Add todo </h2>
          <input onChange={handleChange}  value={todo} className="w-2/3" type="text"></input> 
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-sm font-bold text-white rounded-md mx-5">Add </button>

        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished}></input>

        <h1 className="text-xl font-bold"> Your todos </h1>

        <div className="todos">
        {todos.length ===0 && <div className="m-5">No Todos to Display !!</div>}
          {todos.map(item=>{

        
            return (showFinished || !item.isCompleted ) && <div  key={item.id} className="todo flex  w-1/4  justify-between my-3">

            <div className="flex gap-5"> <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted}></input>
            <div className={item.isCompleted?"line-through":""}>{item.todo} </div></div>
           

            <div className="buttons flex h-full">

              <button  onClick={(e)=>{handleEdit(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-sm font-bold text-white rounded-md mx-2">Edit </button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-sm font-bold text-white rounded-md mx-1"> Delete</button>
            </div>
          
          </div>
        })}
        </div>
     

      </div>
    </>
  );
}

export default App;
