import React from 'react'
import './CircleButton.css';
import PropTypes from 'prop-types';

export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}

NavCircleButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
  tag: (props, propName, componentName) => {
    const prop = props[propName];
    
    if (typeof prop != 'function' && typeof prop != 'string'){
      return new Error(`Invalid prop, ${propName} is expected to be a string or function in ${componentName}, it was ${typeof(prop)}`)
    }
    
  }
  
}