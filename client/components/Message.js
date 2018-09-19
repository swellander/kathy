import React from 'react';

export default ({ message }) => {
  const imgStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '15px'
  }

  const divStyles = {
    display: 'inline-flex',
    border: '1px solid black',
    borderRadius: '15px',
    margin: '20px'
  }

  const pStyles = {
    padding: '10px'
  }
  return (
    <div style={divStyles}>
      <img style={imgStyles} src="https://avatars1.githubusercontent.com/u/32854255?s=400&v=4" />
      <p style={pStyles}>{message.content}</p>
    </div>
  )
} 