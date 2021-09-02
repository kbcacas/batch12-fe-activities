 // FUNCTION FOR TIME
const getTime = () => {
    const dateTime = new Date()
    return (dateTime.getHours()<10?'0':'') + dateTime.getHours() + ":" + (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes()
  }
    const setTime = document.querySelector(".time")
    let time = getTime()
    const appendTime = document.createElement("h1")
    setTime.append(appendTime)
    appendTime.innerHTML = time
    const updateTime = () => {
      let getCurrentTime = setTime.getElementsByTagName("h1")
      let currentTime = getCurrentTime[0].textContent
      if(currentTime !== getTime()){
        getCurrentTime[0].textContent = getTime()
      }
}
updateTime();
setInterval(updateTime, 1000);

//FUNCTION FOR LOADING LIST ITEMS

function addList(){
  if(localStorage.hasOwnProperty('data')){
    let list = JSON.parse(localStorage.getItem('data'))
    if(list.name){
        let greetings = document.querySelector('.greetings');
        const h1 = document.createElement('h1');
        h1.innerHTML = `Hello, ${list.name}.`;
        greetings.append(h1)
        greetings.classList.add('show')
        let inputName = document.querySelector(`.inputName`)
        inputName.remove()
    }
    if(list.focus){
      let focusName = document.querySelector('#focusName');
      let focusContainer = document.querySelector('.focusName');
      let h3 = document.createElement('h3');
        h3.innerHTML = `${list.focus}`;
        focusContainer.append(h3);
        focusContainer.classList.add('show')
        focusName.remove();
    }

    loadTodoList(list)
    
  }
}
addList()


function loadTodoList (list) {
  const todoList = document.querySelector('.todo-list')
  todoList.innerHTML=""
  for(let i=0;i<list.todo.length;i++){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo=document.createElement('li')
    newTodo.innerHTML += list.todo[i].text;
    todoDiv.classList.add('todo-item')
    todoDiv.append(newTodo)
    //btn for done
    const completedButton=document.createElement('button')
    completedButton.innerHTML+='<i style="font-size:1rem" class="fa done-btn">&#xf00c;</i>'
    completedButton.classList.add('completed-btn')
    todoDiv.append(completedButton)
    //btn for delete
    const trashButton=document.createElement('button')
    trashButton.innerHTML+='<i style="font-size:1rem" class="fa">&#xf014;</i>'
    trashButton.classList.add('del-btn')
    todoDiv.append(trashButton)
    //append to list
    todoList.append(todoDiv)

    if(list.todo[i].status ==='done'){
      const todoItem=document.querySelectorAll('.todo-item')
      todoItem[i].classList.add('done')
    }
  }

}

// FUNCTION FOR GREETINGS
let obj={
  todo: [],
  name:'',
  focus:''
}

let userName = document.querySelector('#userName');
function greetings(e){
    //console.log(e.which)
    if(e.which===13){
      checkData()
      let data = JSON.parse(localStorage.getItem('data'))
        data.name = userName.value;
        localStorage.setItem('data',JSON.stringify(data))
        let greetings = document.querySelector('.greetings');
        const h1 = document.createElement('h1');
        h1.innerHTML = `Hello, ${userName.value}.`;
        greetings.append(h1)
        greetings.classList.add('show')
        let inputName = document.querySelector(`.inputName`)
        inputName.classList.add('hide')
        inputName.addEventListener('transitionend',function(){
        inputName.remove()
        })
    }
}

// FUNCTION FOR DISPLAYING FOCUS INPUT

let focusName = document.querySelector('#focusName');
let focusContainer = document.querySelector('.focusName');
function displayFocus(e){
    if(e.which ===13){
      checkData()
      let data = JSON.parse(localStorage.getItem('data'))
        data.focus = focusName.value;
        localStorage.setItem('data',JSON.stringify(data))
        let h3 = document.createElement('h3');
        h3.innerHTML = `${focusName.value}`;
        focusContainer.append(h3);
        focusName.classList.add('hide')
        focusName.addEventListener('transitionend',function(){
        focusName.remove();
        focusContainer.classList.add('show')
        })
    }
}

// FUNCTION FOR RANDOM QUOTE

async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const quote = document.querySelector('.quote')
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quote.textContent = data.content;
      quote.classList.add('show')
    } else {
      quote.textContent = "An error occured";
      console.log(data);
    }
}
  updateQuote();

// EVENT LISTENER FOR GENERATING NEW QUOTE

const newQuote = document.querySelector('.quote-option-generate')
newQuote.addEventListener('click', updateQuote)

// FUNCTION FOR TO-DO LIST

const todoInput=document.querySelector('.todo-input')
const todoButton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')

todoButton.addEventListener('click',addTodo)

function addTodo(event){
  event.preventDefault()
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  const newTodo=document.createElement('li')
  newTodo.innerHTML += todoInput.value;
  todoDiv.classList.add('todo-item')
  todoDiv.append(newTodo)
  //btn for done
  const completedButton=document.createElement('button')
  completedButton.innerHTML+='<i style="font-size:1rem" class="fa done-btn">&#xf00c;</i>'
  completedButton.classList.add('completed-btn')
  todoDiv.append(completedButton)
  //btn for delete
  const trashButton=document.createElement('button')
  trashButton.innerHTML+='<i style="font-size:1rem" class="fa">&#xf014;</i>'
  trashButton.classList.add('del-btn')
  todoDiv.append(trashButton)
  //append to list
  todoList.append(todoDiv)
  newItemListeners()


  if(localStorage.hasOwnProperty('data')){
    let storageData=JSON.parse(localStorage.getItem('data'))
      storageData.todo.push({
        text:todoInput.value,
        status: 'notDone'
      })
      localStorage.setItem('data',JSON.stringify(storageData))
  }else{
          obj.todo.push({
        text:todoInput.value,
        status:'notDone'
      })
      localStorage.setItem('data',JSON.stringify(obj))
  }
  todoInput.value = '';
}




function selectedItem(i){
  console.log(i)
  const todoItem=document.querySelectorAll('.todo-item')
  todoItem[i].classList.toggle('done')
  if(localStorage.hasOwnProperty('data')){
    let keys = JSON.parse(localStorage.getItem('data'))
    let status = todoItem[i].classList.contains('done') ? 'done' : 'notDone'
    keys.todo[i] = {
      text: keys.todo[i].text,
      status: status
    }
    localStorage.setItem('data',JSON.stringify(keys))
  }
}



function deleteItem(i){
  let keys = JSON.parse(localStorage.getItem('data'))
  const todoList = document.querySelector('.todo-list')
  if(localStorage.hasOwnProperty('data')){
    setTimeout(function(){
      keys.todo.splice(i,1)
    localStorage.setItem('data',JSON.stringify(keys))
    loadTodoList(keys)
    addAllEventListeners()
    },500)
  }

}

addAllEventListeners()
function addAllEventListeners(){
  let storage = JSON.parse(localStorage.getItem('data'))
  const allCheckButtons=document.querySelectorAll('.completed-btn')
  const allDelButtons=document.querySelectorAll('.del-btn')
  storage.todo.forEach((value,index)=>{
    allCheckButtons[index].addEventListener('click',function(){
      selectedItem(index)
    })

    allDelButtons[index].addEventListener('click',function(){
      deleteItem(index)
    })
  })
}

function newItemListeners(){
  console.log('1')
  let storage = JSON.parse(localStorage.getItem('data'))
  const allCheckButtons=document.querySelectorAll('.completed-btn')
  const allDelButtons=document.querySelectorAll('.del-btn')
  // storage.todo.forEach((value,index)=>{
    allCheckButtons[allCheckButtons.length-1].addEventListener('click',function(){
      selectedItem(allCheckButtons.length-1)
    })

    allDelButtons[allDelButtons.length-1].addEventListener('click',function(){
      deleteItem(allDelButtons.length-1)
    })
  // })

}



// TOGGLE TO-DO CONTAINER
const todoToggle = document.querySelector('.show-todo')
const todoContainer = document.querySelector('.todo-container')
todoToggle.addEventListener('click',function(){
  todoContainer.classList.toggle('show-greeting')
  todoToggle.classList.toggle('hide')
})

// TOGGLE CLOSE TO-DO CONTAINER
const closeButton=document.querySelector('#close-btn')
closeButton.addEventListener('click', function(){
  todoContainer.classList.toggle('show-greeting')
  todoToggle.classList.toggle('hide')
})


// EVENT LISTENER FOR REFRESH
const refreshButton = document.querySelector('.refresh')
refreshButton.addEventListener('click',function(){
  localStorage.setItem('data',JSON.stringify(obj))
  location.reload()
})

//check if there is data in application

function checkData(){
  if(!localStorage.hasOwnProperty('data')){
    localStorage.setItem('data',JSON.stringify(obj))
  }
}
checkData()

//button to make content editable
const quote = document.querySelector('q')
quote.addEventListener('keypress',editQuote)
function editQuote(e){
  if(e.which===13){
    e.preventDefault()
    document.activeElement.blur()
  }
}


