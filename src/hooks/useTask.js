import { useState, useEffect } from "react"

export const useTask = () => {
    
  const [task, setTask] = useState({
    name: "",
    completed: false,
    id: Date.now(),
    category: ''
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

  const { name, category } = task;

  // Validación: si el nombre está vacío o solo tiene espacios
  if (!name || !name.trim() || !category || !category.trim()) {
    setAlerta({
      msg: "Task name cannot be empty!", 
      error: true
    })

    setTimeout(() => {
      setAlerta({})
    }, 3000)
    return
  }

  // Si pasa la validación, creamos nueva tarea
  const newTask = {
    ...task,
    id: Date.now()
  }

  setTasks([...tasks, newTask]) // Agrega la nueva tarea
  setAlerta({
    msg: "Task added succesfully!"
  }) 

  setTimeout(() => {
    setAlerta({})
  }, 3000)

  // Limpiar formulario
  setTask({
    name: "",
    completed: false,
    id: Date.now(),
    category: ''
  })
}



const handleEdit = (id) => {
  const taskToEdit = tasks.find(task => task.id === id);
  if (!taskToEdit) return;

  // Editar nombre
  const newName = prompt("Enter the new task name", taskToEdit.name);
  if (!newName || newName.trim() === "") {
    return alert("Task name cannot be empty");
  }

  // Editar categoría
  const newCategory = prompt("Enter the new category", taskToEdit.category);
  if (!newCategory || newCategory.trim() === "") {
    return alert("Category name cannot be empty");
  }

  // Actualizar 
  setTasks(tasks.map(task =>
    task.id === id ? {...task, name: newName, category: newCategory} : task
  ));
};

    
    const handleDelete = id => {
      const deleteMessage = confirm('Are you sure do you wanna delete this task?')

      if(deleteMessage) {
        setTasks(tasks.filter(task => task.id !== id))
      } else{
        return 
      }
    }

    return {
        task,
        setTask,
        tasks,
        setTasks,
        handleDelete,
        handleSubmit,
        handleEdit,
        alerta

    }
}
