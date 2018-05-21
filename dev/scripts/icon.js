import React from 'react';

const Icon = (props) => {

    return(
      <li className={props.iconClassName} onMouseEnter={() => props.handleHover(props.firebaseKey, props.name)} onClick={() => props.handleClick(props.firebasekey, props.fullName)}>
        <img src={props.icon} />
      </li>
  )  
};

export default Icon;