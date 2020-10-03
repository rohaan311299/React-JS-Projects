import React,{ useState,useEffect } from 'react';
import { Button,FormControl,Input,InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo.js';
import db from './firebase';
import firebase from 'firebase';

function App() {

  //react hooks
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');
  // console.log(input);

  //when the app loads we need to listen to database and fetch new todos as they get added/removed
  useEffect(()=>{
    //this code fires when app.js loads
    db.collection('todos').onSnapshot(snapshot=>{
      setTodos(snapshot.docs.map(doc =>({id:doc.id,todo: doc.data().todo})))
    })
  },[]);

  const addTodo=(event)=>{
    //this will fire of when we click the button
    event.preventDefault(); //this will stop the refresh

    db.collection('todos').add({
      todo:input,
      timestap:firebase.firestore.FieldValue.serverTimestamp()//stores the value of the timestamp when the todo is created
    })

    setInput(''); //clears the input after being submitted
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form>
        <FormControl>
          <InputLabel >Write a Todo</InputLabel>
          <Input value={input} onChange={event=>setInput(event.target.value) }/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map(todo=>(
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
