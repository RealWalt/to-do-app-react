
const TaskList = ({tasks, setTasks, handleDelete}) => {
    
  return (
            <div className={tasks.length === 0 ? "text-center mt-3" : "mt-3 space-y-2"}>
                {tasks.length === 0 ? ( 
                  <p className="font-bold uppercase">No tasks yet!</p>
                ) : ( tasks.map(t => (
                  <div key={t.id} className="bg-gray-800 p-2 rounded">
                    <p> <span className="font-bold uppercase p-2">Task: </span>{t.name}</p>
                    <p className={t.completed ? "text-green-500 p-2 font-bold uppercase" : " text-red-500 p-2 font-bold uppercase"}><span className="font-bold uppercase text-white">Status: </span>{t.completed ? "Completed" : "Incomplete"}</p>

                    <div className="flex justify-between p-3">

                      <button
                        onClick={() => {
                          setTasks(tasks.map(task => task.id === t.id ? {...task, completed: !task.completed} : task))
                        }}
                        className="bg-green-500 px-2 rounded text-lg hover:bg-green-600"
                          >Done</button>

                        <button
                          className="bg-yellow-500 px-2 rounded text-lg hover:bg-yellow-600"
                          onClick={() => {
                            const newName = prompt("Enter the new task name", t.name);
                            if (newName && newName.trim() !== "") {
                              setTasks(tasks.map(task => task.id === t.id ? {...task, name: newName} : task))
                            } else {
                              return alert("Task name cannot be empty")
                            }
                          }}
                        >Edit</button>

                      <button 
                        className="bg-red-500 px-2 rounded text-lg hover:bg-red-600"
                        onClick={() => {handleDelete(t.id)}}
                        >Delete</button>
                    </div>
                  </div>)
                ))}
            </div>
  )
}

export default TaskList