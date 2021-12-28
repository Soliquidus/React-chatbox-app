import React, { Component } from 'react'

export default class MessageForm extends Component {
    state = {
        message: '',
        length: this.props.length
    }

    createMessage = () => {
        const { addMessage, pseudo, length } = this.props
        const message = {
            pseudo,
            message: this.state.message
        }

        addMessage(message)
        // Reset textArea when sent
        this.setState({ message: '', length })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.createMessage()
    }

    handleChange = event => {
        const message = event.target.value
        const length = this.props.length - message.length
        this.setState({ message, length })
    }

    handleKeyUp = event => {
        if (event.key === 'Enter') {
            this.createMessage()
        }
    }
    
    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <textarea
                    required
                    value={this.state.message}
                    maxLength={this.props.length}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                />
                <div className="info">{this.state.length}</div>
                <button type='submit'>Send!</button>
            </form>
        )
    }
}
