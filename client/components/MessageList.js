import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _loadMessages } from '../store';

class MessageList extends Component {
  componentDidMount() {
    this.props.loadMessages();
  }

  render() {
    return (
      <div>
        {this.props.messages.map(message => (
          <p key={message.id}>{message.content}</p>
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