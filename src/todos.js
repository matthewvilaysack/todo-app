
import uuidv4 from 'uuid/v4'


let todos = []
//Todos stored as an array.

//grab each todo by its ID.



// Load the todos from the browser. If there are none, set the todos array to be empty.
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    todos = todosJSON ? JSON.parse(todosJSON) : []
}

//Save the todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}


//Create the todos
const createTodo = (text) => {
    let id = uuidv4()
    todos.push({
        id,
        text,
        completed: false
    })
    saveTodos()
}

//Get the todos as a function
const getTodos = () => todos
// Remove todos

const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)


    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    saveTodos()
}

//Toggle completed todos
const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { loadTodos, saveTodos, toggleTodo, getTodos, createTodo, removeTodo }