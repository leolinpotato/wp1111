import React, { Component, useState, useEffect } from 'react';
import Delete from '../Components/Delete'
import './App'

function Item (props) {
    /*const [completed, setCompleted] = useState(false);*/
    const handleClick = () => {
        if (props.obj.completed == false) {
            props.obj.completed = true;
            global.unCompleted--;
        }
        else {
            props.obj.completed = false;
            global.unCompleted++;
        }
        props.onChange(props.id, false);
    }
    const handleDelete = () => {
        if (props.obj.completed == false)
            global.unCompleted--;
        props.onChange(props.id, true);
    }
    let item;
    if (props.display == 0 || (props.display == 1 && !props.obj.completed) || (props.display == 2 && props.obj.completed))
        item = (
            <li key={props.name} className="todo-app__item">
              <div className="todo-app__checkbox">
                <input type="checkbox" id={props.id}/>
                <label htmlFor={props.id} onClick={handleClick}/>
              </div>
              <h1 className={`todo-app__item-detail ${props.obj.completed ? "completed" : ""}`}>{props.obj.name}</h1>
              <Delete onChange={handleDelete}/>
            </li>
        );  //
    else 
        item = (
            <li key={props.name} className="todo-app__item display_none">
              <div className="todo-app__checkbox">
                <input type="checkbox" id={props.id}/>
                <label htmlFor={props.id} onClick={handleClick}/>
              </div>
              <h1 className={`todo-app__item-detail ${props.obj.completed ? "completed" : ""}`}>{props.obj.name}</h1>
              <Delete onChange={handleDelete}/>
            </li>
        );  //
    return item;
}

export default Item;