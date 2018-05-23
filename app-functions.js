const getSavedTodos = () => localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')) : [];

const removeTodo = id => {
    const todoIndex = todos.findIndex(todo =>  todo.id === id);
    console.log(todoIndex);

    todoIndex > -1 ? todos.splice(todoIndex, 1) : null;

}

const saveTodos = todo => localStorage.setItem('todos', JSON.stringify(todo));

const toggleTodo = id => {
    const todo = todos.find(todo => todo.id === id);

    todo !== undefined ? todo.completed = !todo.completed : null;
}

const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter(todo => {
        const filterTodo = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        return  filterTodo && (!filters.hideCompleted || !todo.completed);
    });
    const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

    filteredTodos.forEach(todo => {
        const p = generateTodoDOM(todo);
        document.querySelector('#todos').appendChild(p);
    });
};

const generateTodoDOM = todo => {
    const divTodo = document.createElement('div');
    const checkboxTodo = document.createElement('input');
    const todoText = document.createElement('span');
    const buttonDelete = document.createElement('button');
  
    checkboxTodo.setAttribute('type', 'checkbox'); 
    checkboxTodo.checked = todo.completed;
    divTodo.appendChild(checkboxTodo);
    checkboxTodo.addEventListener('change', e => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });
    
    todoText.textContent = todo.text;
    divTodo.appendChild(todoText);

    buttonDelete.textContent = 'x';
    divTodo.appendChild(buttonDelete);
    buttonDelete.addEventListener('click', e => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters); 

    return divTodo
};

const generateSummaryDOM = incompleteTodos => {
    const total = document.createElement('p');
    total.textContent = `Incompleted todos: ${incompleteTodos.length}`;
    return total
}