let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

const hideCompleted = function(todos) {
    const uncompletedTodo = todos.filter(function(todo) {
        return !todo.completed
    });
    renderTodos(uncompletedTodo, filters);
}

document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value; 
    renderTodos(todos, filters);
});

document.querySelector('#add-todo').addEventListener('submit', function(e){
    e.preventDefault();
    const newTodo = { text: e.target.elements.todo.value, completed: false };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.todo.value = '';
});

document.querySelector('#completed').addEventListener('change', function(e) {
    filters.hideCompleted =  e.target.checked;
    renderTodos(todos, filters);
});
console.log(todos);
renderTodos(todos, filters);


