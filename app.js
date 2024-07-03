const panelList = document.querySelector('.panel-list');
const panelInput = document.querySelector('.panel-input');
const panelAddButton = document.querySelector('.add-todo-button');

let initialTodos = [
    {
        id: 1,
        title: 'LEARN HTML',
        is_done: false,
    },
    {
        id: 2,
        title: "LEARN CSS",
        is_done: false,
    },
    {
        id: 3,
        title: "LEARN JAVASCRIPT",
        is_done: false,
    },
    {
        id: 4,
        title: 'LEARN REACT.JS',
        is_done: false,
    },
]

let todos = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : initialTodos

let updatedTodo = null
let updatedTodoIndex = null

function createElement(tagName, className, innerText, parent) {
    let element = document.createElement(tagName);
    element.setAttribute('class', className)
    element.innerText = innerText
    parent.appendChild(element)
    return element
}

function generateTodos() {

    panelList.innerHTML = '';
    for (let todo of todos) {
        let todoLi = createElement('li', 'panel-item', '', panelList);
        let todoSpan = createElement('span', '', todo.title, todoLi);
        let todoEditButton = createElement('button', 'panel-item__edit', 'edit', todoLi);
        let todoDelateButton = createElement('button', 'panel-item__delate', 'delate', todoLi);

        todoDelateButton.addEventListener('click', function () {

            if (updatedTodo !== null && updatedTodoIndex !== null) {
                alert('Todo yangilanmoqda!!')
            } else {
                delateTodo(todo.id)
            }
        })

        todoEditButton.addEventListener('click', function () {
            if (updatedTodo !== null && updatedTodoIndex !== null) {
                alert('Todo yangilanmoqda!!')
            } else {
                updateTodo(todo.id)
            }
        })
        todoSpan.addEventListener('click', function () {
            if (this.style.textDecoration === 'line-through') {
                this.style.textDecoration = 'none';
            } else {
                this.style.textDecoration = 'line-through';
            }
        })

    }

}

generateTodos()

function createTodo(e) {
    e.preventDefault();
    if (panelInput.value.trim() === '') {
        alert('Maydon bo\'sh')
    } else {
        if (updatedTodo !== null && updatedTodoIndex !== null) {
            updatedTodo.title = panelInput.value
            todos = [...todos.slice(0, updatedTodoIndex), updatedTodo, ...todos.splice(updatedTodoIndex)]
            updatedTodo = null
            updatedTodoIndex = null
            panelInput.value = ''
            panelAddButton.innerText = 'Add'
            generateTodos()
            console.log(todos)
        } else {
            let newTodo = {
                id: todos.length <= 0 ? 1 : todos[todos.length - 1].id + 1,
                title: panelInput.value,
                is_done: false,

            }


            todos.push(newTodo)
            panelInput.value = ''
            generateTodos()
        }
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}
function delateTodo(id) {
    todos = todos.filter((item => item.id !== id))
    generateTodos()
    localStorage.setItem('todos', JSON.stringify(todos))
}
function updateTodo(id) {
    updatedTodo = todos.find(item => item.id === id)
    updatedTodoIndex = todos.findIndex(item => item.id === id)
    delateTodo(id)

    panelInput.value = updatedTodo.title
    panelAddButton.innerText = 'Edit'
    console.log(updatedTodo)
    console.log(updatedTodoIndex)
}



panelAddButton.addEventListener('click', createTodo)

const clearButton = document.querySelector('.panel-clear');
const panelText = document.querySelector('.panel-Text');


function clearTodos() {
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos))
    generateTodos();
    panelText.classList.add('active')
    clearButton.classList.add('active')
}
clearButton.addEventListener('click', clearTodos)





