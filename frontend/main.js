import { createTask } from './utils/create-task.js';

const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');

// Fetch and display tasks
async function showTasks(){
  try {
    const { data } = await axios.get('/api/v1/tasks');
    const tasks = data.data;

    const newTasksList = tasks.map(task => createTask(task));
    taskList.innerHTML = newTasksList.join('');
  } 
  catch (error) {
    errorMsg.classList.toggle('hidden'); 
  }
}

showTasks();

// Create task and update list
const formDOM = document.getElementById('formDOM');
const input = document.getElementById('task-description');
const inputErrorAlert = document.getElementById('input-error-alert');
const createTaskSuccess = document.getElementById('create-task-success'); 

formDOM.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const taskValue = input.value;

  try{
    await axios.post('/api/v1/tasks', { description: taskValue })
    await showTasks();

    inputErrorAlert.classList.add('hidden');
    
    createTaskSuccess.classList.remove('hidden');
    setTimeout(()=>{
      createTaskSuccess.classList.add('hidden');
    }, 2000)

    input.value = '';
  }
  catch(error){
    inputErrorAlert.classList.remove('hidden');
    inputErrorAlert.textContent = error.response.data.msg.errors.description.message;
  }

})

// Delete tasks
taskList.addEventListener('click', async(e)=>{
  const el = e.target;

  if(el.classList.contains('fa-trash')){
    try {
      const taskID = el.parentElement.parentElement.parentElement.dataset.id;
      await axios.delete(`/api/v1/tasks/${taskID}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
})