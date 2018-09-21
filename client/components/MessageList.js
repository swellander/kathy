import React, { Component, Fragment } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { _loadMessages, _deleteMsg } from '../store';

class MessageList extends Component {
  componentDidMount() {
    this.props.loadMessages();
    console.log('loading');
  }

  render() {
    const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingLeft: '50px'
    }

    const msgStyle = {
      display: 'flex', 
      justifyContent: 'flex-end'
    }

    const optStyle = {
      display: 'flex', 
      justifyContent: 'flex-end',
      paddingRight: '30px',
      alignItems: 'flex-start'
    }

    const { deleteMsg } = this.props
    return (
      <div style={divStyle}>
        {this.props.messages.map(message => (
        <Fragment>
          <div style={msgStyle}>
          <Message key={message.id} message={message} />
          </div>
          <div style={optStyle}>
            <small id="edit" class="form-text text-muted">Edit</small>
            <small id="delete" class="form-text text-muted" onClick={()=>deleteMsg(message)}>Delete</small>
          </div>
        </Fragment>
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(_loadMessages()),
  deleteMsg: (msg) => dispatch(_deleteMsg(msg))
});

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);