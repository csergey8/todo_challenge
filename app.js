let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

const hideCompleted = todos => {
    const uncompletedTodo = todos.filter(todo => !todo.completed);
    renderTodos(uncompletedTodo, filters);
}

document.querySelector('#search-todo').addEventListener('input', e => {
    filters.searchText = e.target.value; 
    renderTodos(todos, filters);
});

document.querySelector('#add-todo').addEventListener('submit', e => {
    e.preventDefault();
    const newTodo = {
        id: uuidv4(), 
        text: e.target.elements.todo.value, 
        completed: false };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.todo.value = '';
});

document.querySelector('#completed').addEventListener('change', e => {
    filters.hideCompleted =  e.target.checked;
    renderTodos(todos, filters);
});


renderTodos(todos, filters);


