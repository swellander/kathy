import React, { Component } from 'react'

export default class Textbox extends Component {

  render() {
  	
  	return (
  	<div className='container'>	
  	  <form>
		  <div className="form-group">
		    <label>Email address</label>
		    <input type="text" className="form-control" placeholder="Write a message..."/>
		  </div>
	    <button type="submit" className="btn btn-primary">Submit</button>
	  </form>
	</div>
  	)
  }
}