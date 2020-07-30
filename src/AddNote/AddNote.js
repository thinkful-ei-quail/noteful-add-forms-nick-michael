import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.noteInput = React.createRef();
        this.noteContent = React.createRef();
    }

    static contextType = ApiContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const noteName = this.noteInput.current.value;
        const noteContent = this.noteContent.current.value;
        // console.log(noteName);
        console.log(noteContent);
        const note = {
            name: noteName,
        }

        fetch(`${config.API_ENDPOINT}/notes/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    render() {
        return (
            <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
                <h2>New Note</h2>
                <label htmlFor="noteName">Note Name:</label>
                <input type="text" name="noteName" id="noteName" ref={this.noteInput} />
                <label htmlFor="noteContent">Note Content:</label>
                <textarea name="noteContent" id="noteContent" ref={this.noteContent} />
                <button type="submit">Add Note</button>
            </form>
        );
    }
}