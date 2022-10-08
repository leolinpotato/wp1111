import React, { Component, useState, useEffect } from 'react';

function ViewButtons(props) {
    const clickAll = () => {props.onChange(0);}
    const clickActive = () => {props.onChange(1);}
    const clickCompleted = () => {props.onChange(2);}
    return (
      <ul className="todo-app__view-buttons">
        <button onClick={clickAll}>All</button>
        <button onClick={clickActive}>Active</button>
        <button onClick={clickCompleted}>Completed</button>
      </ul>
    );
}

export default ViewButtons;