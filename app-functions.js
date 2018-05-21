const getSavedTodos = function() {
    if(localStorage.getItem('todos') !== null) {
        return JSON.parse(localStorage.getItem('todos'));
    } else {
        return [];
    }
}

const saveTodos = function(todo) {
    localStorage.setItem('todos', JSON.stringify(todo));
}

const renderTodos = function(todos, filters) {
    const filteredTodos = todos.filter(function(todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && !filters.hideCompleted || !todo.completed;
    });

    const incompleteTodos = filteredTodos.filter(function(todo) {
        return !todo.completed
    });

    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

    filteredTodos.forEach(function(todo) {
        const p = generateTodoDOM(todo);
        document.querySelector('#todos').appendChild(p);
    });
};

const generateTodoDOM = function(todo) {
    const p = document.createElement('p');
    p.textContent = todo.text;
    return p
};

const generateSummaryDOM = function(incompleteTodos) {
    const total = document.createElement('p');
    total.textContent = `Incompleted todos: ${incompleteTodos.length}`;
    return total
}