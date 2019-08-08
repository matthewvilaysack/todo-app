import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// Render application todos based on filters
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no to-dos to show'
        todoEl.appendChild(messageEl)
    }
}


//Generate the todo DOM (elements for a todo)
const generateTodoDOM = (todo) => {
    const containerEl = document.createElement('div')
    const todoEl = document.createElement('label')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeBtn = document.createElement('button')
    //the container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item_container')
    todoEl.appendChild(containerEl)

    //the checkbox.
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })
    //remove button
    removeBtn.textContent = 'remove'
    removeBtn.classList.add('button', 'button--text')
    todoEl.appendChild(removeBtn)
    removeBtn.addEventListener('click', () => {
        // console.log('click')
        removeTodo(todo.id)
        console.log(removeTodo(todo.id))
        renderTodos()
    })

    //Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    return todoEl
}

//Render the todos 
// Generate a summary for the todo
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}


export { generateTodoDOM, generateSummaryDOM, renderTodos }