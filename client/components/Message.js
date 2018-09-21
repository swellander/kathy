import React, { Fragment } from 'react';

export default ({ message }) => {
  const imgStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    justifyContent: 'space-around'
  }

  const divStyles = {
    display: 'inline-flex',
    justifyContent: 'flex-end',
    border: '1px solid black',
    borderRadius: '15px',
    margin: '20px'
  }

  const pStyles = {
    padding: '10px'
  }

  const smStyles = {
    display: 'flex', 
    alignItems: 'baseline'
  }

  return (
      <div style={divStyles}>
        <img style={imgStyles} src="https://avatars1.githubusercontent.com/u/32854255?s=400&v=4" />
        <p style={pStyles}>{message.content}</p>
      </div>
  )
} 