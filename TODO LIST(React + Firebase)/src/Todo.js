import React,{useState} from 'react';
import {List, ListItem,ListItemText,ListItemAvatar,Modal,Button } from '@material-ui/core';
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles((theme)=>({
    paper:{
        position:'absolute',
        width:400,
        backgroundColor:theme.palette.background.paper,
        border:'2px solid #000',
        boxShaddow:theme.shadows[5],
        padding:theme.spacing(2,4,3),
    },
}));

function Todo(props) {
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [input,setInput]=useState();

    const handleOpen=()=>{
        setOpen(true);
    };

    const updateTodo=()=>{
        //update the todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo:input
        },{merge:true});
    
        setOpen(false);
    }
    
    return (
        <>
            <Modal 
                open={open}
                onClose={e=>setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>Im a modal</h1>
                    <input placeholder={props.todo.todo} value={input} onChanage={event=>setInput(event.target.value)} />
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List className="todo_list">
                <ListItem >
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
                </ListItem>
                <button onClick={e=>setOpen(true)}>Edit</button>
                {/* This button will delete any todo */}
                <DeleteForeverIcon onClick={events=>db.collection('todos').doc(props.todo.id).delete()} /> 
            </List>
        </>
    )
}

export default Todo
