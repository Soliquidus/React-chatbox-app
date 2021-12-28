import './App.css';
import { Component } from 'react';
import MessageForm from './components/MessageForm';
import Message from './hooks/Message';
import { useParams } from 'react-router-dom';

class App extends Component {


  state = {
    messages: {},
    // React Router creates props whitch contains useful infos like
    // the pseudo given as parameter in the url
    pseudo: this.props.params.pseudo
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    this.setState({ messages })
  }

  render() {
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <Message
          key={key}
          pseudo={this.state.messages[key].pseudo}
          message={this.state.messages[key].message} />
      ))
    return (
      <div className="box">
        <div>
          <div className="messages">
            <div className="message">
              {messages}
            </div>
          </div>
          <MessageForm
            length={140}
            pseudo={this.state.pseudo}
            addMessage={this.addMessage} />
        </div>
      </div>
    );
  }
}

// Since React router 6 we need to import the params as a new component when not used
// in a React function
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
}

export default withParams(App);
