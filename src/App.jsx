import { useState } from 'react'

function TodoForm({ task, setTask, addTask }) {
  return (
  
    <div className="mx-auto mb-1 flex max-w-md gap-1">
      <input
  type="text"
  placeholder="Enter a task"
  value={task}
  onChange={(e) => setTask(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }}
  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
/>
    <button
  onClick={addTask}
  className="rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
>
  Add Task
</button>
    </div>
  )
}

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask() {
  if (task.trim() === '') {
    return
  }

  setTasks([...tasks, { text: task, completed: false }])
  setTask('')
}
function toggleTask(index) {
  setTasks(tasks.map((task, i) => {
    if (i === index) {
      return {
        ...task,
        completed: !task.completed
      }
    }

    return task
  }))
}
  return (
    <div className="min-h-screen bg-blue-100 p-10">
  <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
    My To-Do App
  </h1>
      <TodoForm
        task={task}
        setTask={setTask}
        addTask={addTask}
      />

      <ol className="mx-auto max-w-md space-y-1 mt-8">
  {tasks.map((task, index) => (
    <li
      key={index}
      onClick={() => toggleTask(index)}
      className="flex items-center justify-between rounded-lg bg-white px-1 py-1 shadow-sm"
    >
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none'
        }}
      >
        {task.text}
      </span>

      <button
        className="ml-4 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation()
          setTasks(tasks.filter((_, i) => i !== index))
        }}
      >
        Delete
      </button>
    </li>
  ))}
</ol>
    </div>
  )
}

export default App