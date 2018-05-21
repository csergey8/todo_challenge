const todos = [{
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: false
}];

const filters = {
    searchText: ''
}



const renderTodos = function(todos, filters) {
    const filteredTodos = todos.filter(function(todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    const incompleteTodos = filteredTodos.filter(function(todo) {
        return todo.completed
    });

    document.querySelector('#todos').innerHTML = '';

    const total = document.createElement('p');
    total.textContent = `Incompleted todos: ${incompleteTodos.length}`;
    document.querySelector('#todos').appendChild(total);

    filteredTodos.forEach(function(todo) {
        const p = document.createElement('p');
        p.textContent = todo.text;
        document.querySelector('#todos').appendChild(p);
    });
};

document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value; 
    renderTodos(todos, filters);
});

renderTodos(todos, filters);


