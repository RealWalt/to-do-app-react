import { useTask } from "./hooks/useTask"

import Header from "./components/layout/Header"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import Footer from "./components/layout/Footer"

function App() {

  const { task, setTask, setTasks, tasks, alerta, handleSubmit, handleDelete, handleEdit} = useTask()

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

              <TaskList
               tasks={tasks} 
               setTasks={setTasks} 
               handleDelete={handleDelete} 
               handleEdit={handleEdit}
               />
            </div>
        </main>

        <Footer />

    </>
  )
}

export default App
