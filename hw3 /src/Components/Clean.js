import React, { Component, useState, useEffect } from 'react';
import '../Containers/App'

function Clean(props) {
    const handleClick = () => {
        props.onChange();
    }
    return (
      <div className={`todo-app__clean ${global.total - global.unCompleted > 0 ? "" : "hidden"}`} onClick={handleClick}>
        <button>Clear completed</button>
      </div>
    );
}

export default Clean;