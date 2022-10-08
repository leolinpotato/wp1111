import '../App.css';
import '../style.css';
import React, { Component, useState, useEffect } from 'react';
import Header from '../Components/Header'
import Clean from '../Components/Clean'
import ViewButtons from '../Components/ViewButtons'
import Item from './Item'

global.total = 0;
global.unCompleted = 0;

function App() {
    const [todoList, setTodoList] = useState([]);
    const [count, setCount] = useState(0);
    const [todo, setTodo] = useState(0);
    const [display, setDisplay] = useState(0);  // 0 => ALL, 1 => Active, 2 => Completed
    const handleKeyUp = (e) => {
        if (e.code == "Enter") {
            create_item(e.target.value);
            e.target.value = "";  // empty the input string
        }
    }
    const create_item = (text) => {
        let newList = todoList;
        newList.push({name: text, completed: false});
        setTodoList(newList);
        global.total++;
        global.unCompleted++;
        setCount(global.total);
        setTodo(global.unCompleted)
    }
    const remove_item = (index) => {
        let newList = todoList;
        delete newList[index];
        /*newList.splice(index, 1);*/
        setTodoList(newList);
    }
    const update = (index, deleted) => {
        if (deleted == true) {
            remove_item(index);
            global.total--;
        }
        setCount(global.total);
        setTodo(global.unCompleted);
    }
    const view = (mode) => {
        setDisplay(mode);
    }
    const clean = () => {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i] == undefined)
                continue;
            if (todoList[i].completed)
                update(i, true);
        }
    }
    return (
      <>
        <Header/>
        <section className="todo-app__main">
          <input className="todo-app__input" placeholder="What needs to be done?" onKeyUp={handleKeyUp}/>
          <ul className={`todo-app__list ${count == 0 ? "display_none" : ""}`} id="todo-list">
            {todoList.map((item, index) => <Item key={index} obj={item} id={index} onChange={update} display={display}/>)}
          </ul>
        </section>
        <footer className={`todo-app__footer ${count == 0 ? "display_none" : ""}`} id="todo-footer">
          <div className="todo-app__total">{todo} left</div>
          <ViewButtons onChange={view}/>
          <Clean onChange={clean}/>
        </footer>
      </>
    );
}

export default App;