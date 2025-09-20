
import Alerta from "./Alerta"

const TaskForm = ({task, setTask, handleSubmit, alerta}) => {

  const {msg} = alerta;
  return (
    <form
            onSubmit={handleSubmit}
            className="sm:max-w-xl md:max-w-md md:ml-3 mx-5">
             { msg && <Alerta alerta={alerta} />}
            <label htmlFor="task">Add a new task:</label>
            <input  
              type="text"
              placeholder="Add a new task"
              className="w-full p-2 border border-gray-300 rounded mt-3 text-gray-900"
              id="task"
              value={task.name}
              onChange={e => setTask({...task, name: e.target.value})}
            />

            <label htmlFor="task">Category:</label>
            <input  
              type="text"
              placeholder="Add a category for you task"
              className="w-full p-2 border border-gray-300 rounded mt-3 text-gray-900"
              id="category"
              value={task.category}
              onChange={e => setTask({...task, category: e.target.value})}
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 p-2 mt-3 w-full font-bold uppercase"
              type="submit"

              >Add task</button>
          </form>
  )
}

export default TaskForm

