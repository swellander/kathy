import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { _loadMessages } from '../store';

class MessageList extends Component {
  componentDidMount() {
    this.props.loadMessages();
    console.log('loading');
  }


  render() {
    const divStyle = {
      display: 'flex',
      flexDirection: 'column'
    }
    return (
      <div style={divStyle}>
        {this.props.messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(_loadMessages())
});

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);