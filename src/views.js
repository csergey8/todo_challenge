// renderTodos
// Arguments: none
// Return value: none

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

// Make sure to set up the exports
import { getTodos, toggleTodo, removeTodo, saveTodos } from './todos';
import { getFilters } from './filters';



const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const filters = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

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


const generateTodoDOM = todo => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkboxTodo = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button');

    checkboxTodo.setAttribute('type', 'checkbox');
    checkboxTodo.checked = todo.completed;
    containerEl.appendChild(checkboxTodo);
    checkboxTodo.addEventListener('change', e => {
        toggleTodo(todo.id);
        renderTodos();
    });

    todoText.textContent = todo.text;
    containerEl.appendChild(todoText);

    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', e => {
        removeTodo(todo.id);
        renderTodos();
    });

    return todoEl
};

const generateSummaryDOM = incompleteTodos => {
    const total = document.createElement('h2');
    total.classList.add('list-title');
    incompleteTodos.length === 1 ?
    total.textContent = `You have one todo left` : 
    total.textContent = `You have ${incompleteTodos.length} todos left`;
    return total
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }