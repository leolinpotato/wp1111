import logo from './logo.svg';
import './App.css';
import './style.css';
import React, {Component} from 'react';

function Header() {
    return (
      <header className="todo-app__header todo-app__title">todos</header>
    );
}

// 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            todo_list: [],
            text: ''
        }
    }
    handleKeyUp = (e) => {
        if (e.code == "Enter") {
            this.create_item(e.target.value);
            e.target.value = "";  // empty the input string
        }
    }
    create_item = (text) => {
        this.state.text = text;
        let newList = this.state.todo_list;
        newList.push(text)
        this.setState(state => ({
                count: state.count + 1,
                todo_list: newList,
                text: ''
        }))
    }
    render() {
        return (
          <>
            <Header/>
            <section className="todo-app__main">
              <input className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.handleKeyUp}/>
              <ul className={`todo-app__list ${this.state.count == 0 ? "hidden" : ""}`} id="todo-list">
                {this.state.todo_list.map((item, index) => <Item key={index} name={item} id={index}/>)}
              </ul>
            </section>
            <footer className={`todo-app__footer ${this.state.count == 0 ? "hidden" : ""}`} id="todo-footer">
              <div className="todo-app__total">{this.state.count} left</div>
              <ViewButtons/>
              <Clean/>
            </footer>
          </>
        );
    }
}

//

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false
        }
    }
    handleClick = () => {
        if (this.state.completed == false)
            this.setState(state => ({completed: true}));
        else 
            this.setState(state => ({completed: false}));
        console.log(this.state.completed)
    }
    render() {
        return (
          <li key={this.props.name} className="todo-app__item">
            <div className="todo-app__checkbox">
              <input type="checkbox" id={this.props.id}/>
              <label htmlFor={this.props.id} onClick={this.handleClick}/>
            </div>
            <h1 className={`todo-app__item-detail ${this.state.completed ? "completed" : ""}`}>{this.props.name}</h1>
            <img src="./img/x.png" className="todo-app__item-x"/>
          </li>
        );
    }
}

//

function ViewButtons() {
    return (
      <ul className="todo-app__view-buttons">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </ul>
    );
}

//

function Clean() {
    return (
      <div className="todo-app__clean">
        <button>Clear completed</button>
      </div>
    );
}

export default App;
