import React from 'react';

const Icon = (props) => {

    return(
      <li className={props.iconClassName} onMouseEnter={() => props.handleHover(props.firebaseKey, props.name)}>
        {/* {props.name} */}
        <img src={props.icon} />
        
      </li>
  )  
};

export default Icon;