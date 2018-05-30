// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage
import { createTodo, loadTodos } from './todos';
import { setFilters } from './filters';
import { renderTodos, generateTodoDOM, generateSummaryDOM } from './views';


renderTodos();

document.querySelector('#search-todo').addEventListener('input', e => {
    setFilters({
        searchText: e.target.value
    });
    renderTodos();
});

document.querySelector('#completed').addEventListener('change', e => {
    console.log(e);
    setFilters({
        hideCompleted: e.target.checked
    });
    renderTodos();
});

document.querySelector('#add-todo').addEventListener('submit', e => {
    e.preventDefault();
    createTodo(e.target.elements.text.value);
    e.target.elements.text.value = '';
    renderTodos();
});

//Watcher for localStorage 
window.addEventListener('storage', e => {
    if (e.key === 'todos') {
        loadTodos();
        renderTodos()
    }
});


