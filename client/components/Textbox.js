import React, { Component } from 'react'
import store, { writeMsg, _submitMsg, _loadMessages } from '../store'
import { connect } from 'react-redux'

class Textbox extends Component {

	handleChange = (e) => {
		this.props.writeMsg(e.target.value)
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { msgEntry, _submitMsg } = this.props
		_submitMsg({ content: msgEntry })
	}

	//why do we need to load messages from this component?
	componentDidMount() {
		this.props._loadMessages()
	}

	render() {
		const { msgEntry } = this.props
		const { handleChange, handleSubmit } = this

		return (
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email address</label>
						<input type="text" value={msgEntry} className="form-control" placeholder="Write a message..." onChange={handleChange} />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	msgEntry: state.msgEntry
})

const mapDispatchToProps = dispatch => ({
	writeMsg: (content) => dispatch(writeMsg(content)),
	_submitMsg: (msg) => dispatch(_submitMsg(msg)),
	_loadMessages: () => dispatch(_loadMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Textbox)