
import React,{ useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import './App.css';

function App() {

  const[screen, setScreen] = useState(false);
  const[allTodo, setAllTodo] = useState([]);
  const[newTitle,setNewTitle] = useState('');
  const[newDescription,setNewDescription] = useState('');
  const[completedTodo,setCompletedTodo] = useState([])

  const handleAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      discription:newDescription
    }
    let updatedTodo = [...allTodo];
    updatedTodo.push(newTodoItem);
    setAllTodo(updatedTodo);
    localStorage.setItem('todolist',JSON.stringify(updatedTodo));
  };

  const handleDelete = (index) =>{
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index,1);
    
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setAllTodo(reducedTodo);
  };

  const handleComplete=(index)=>{
    let now = new Date();
    let dd = now.getDay();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let hr = now.getHours();
    let mnt = now.getMinutes();
    let sec = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + '-' + ' at ' + hr + ':' + mnt + ":" + sec;

    let filteredItem = {
     ...allTodo[index],
     completedOn:completedOn
    }
    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedTodo',JSON.stringify(updatedCompletedArr));
  };

  const handleCompletedDelete= (index) =>{
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index);
    
    localStorage.setItem('completedTodo',JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  }

  useEffect(() => {
   let savedTodo = JSON.parse(localStorage.getItem('todolist')); // convert in to an array
   let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
   if(savedTodo){ // not saved null values
    setAllTodo(savedTodo);
   }

   if(saveCompletedTodo){
    setCompletedTodo(saveCompletedTodo);
   }
  },[]);

  return (
    <div className="App">
      <h1>Todo list</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='enter the task title' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='enter the task title' />
          </div>
          <div className='todo-input-item'>
           <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
           <button className={`secondaryBtn ${screen===false && 'active'}`} onClick={()=>setScreen(false)}>Todo</button>
           <button className={`secondaryBtn ${screen===true && 'active'}`} onClick={()=>setScreen(true)}>completed</button>
        </div>

        <div className='todo-list'>

         {screen===false &&allTodo.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
              <h3>{item.title}</h3>
              <p>{item.discription}</p>
            </div>
            <div>
            <MdDelete className='icon' onClick={()=>handleDelete(index)} title='Delete?'/>
            <FaCircleCheck onClick={()=>{handleComplete(index)}} title='complete' className='check-icon'/>
            </div>
           </div>
            )
         })}

{screen===true && completedTodo.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
              <h3>{item.title}</h3>
              <p>{item.discription}</p>
              <p><small>completedOn: {item.completedOn}</small></p>
            </div>
            <div>
            <MdDelete className='icon' onClick={()=>handleCompletedDelete(index)} title='Delete?'/>
           
            </div>
           </div>
            )
         })}

        </div>
      </div>
    </div>
  );
}

export default App;
