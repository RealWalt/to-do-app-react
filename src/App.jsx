import { useEffect, useState } from "react"

import Header from "./components/layout/Header"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import Footer from "./components/layout/Footer"

function App() {

  const [task, setTask] = useState({
    name: "",
    completed: false,
    id: Date.now()
  })

  //Carga las tareas del localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')  
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  //State de Alerta
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))  // guarda en el localStorage cada que se agrega una tarea
  }, [tasks])



  const handleSubmit = e => {
    e.preventDefault()

    const { name } = task;

    if (name === "" || name.trim() === "") {
       setAlerta({
        msg: "Task name cannot be empty!", 
        error: true})

        setTimeout(() => {
          setAlerta({})
        }, 3000);
        return
    }
    // Arregla el id para que no se repita
    const newTask = {
      ...task,
      id: Date.now()
    }

    setTasks([...tasks, newTask]) // Agrega la nueva tarea al array de tareas
    setAlerta({
      msg: "Task added succesfully!"
    }) 

    setTimeout(() => {
      setAlerta({})
    }, 3000);
    // Limpiar el formulario
    setTask({
      name: "",
      completed: false,
      id: Date.now()
    })
}


    const handleDelete = id => {
      const deleteMessage = confirm('Are you sure do you wanna delete this task?')

      if(deleteMessage) {
        setTasks(tasks.filter(task => task.id !== id))
      } else{
        return 
      }
    }


  return (
    <>

    <Header />

        <main className="flex flex-col justify-center md:flex-row md:justify-around ">

          <TaskForm 
            task={task} 
            setTask={setTask} 
            handleSubmit={handleSubmit}
            alerta={alerta}
            />
          

            <div className="mt-5 sm:ml-5 md:mt-0 sm:max-w-xl md:max-w-md md:mr-3 mx-5 w-full"> 
              <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                <h2 className="font-bold text-lg">Tasks:</h2>

                {tasks.length > 0 && (
                  <p>{tasks.filter(task => task.completed).length} / {tasks.length} tasks completed</p>
                )}


              </div>

              <TaskList tasks={tasks} setTasks={setTasks} handleDelete={handleDelete} />
            </div>
        </main>

        <Footer />

    </>
  )
}

export default App
