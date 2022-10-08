import React, { Component, useState, useEffect } from 'react';

function Delete(props) {
    const handleClick = () => {
        props.onChange();
    }
    return (
        <img src="./img/x.png" className="todo-app__item-x" onClick={handleClick}/>
    )
}

export default Delete;