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
        const currentTime = new Date();
        console.log('current time', currentTime);
        const currentTimeISO = currentTime.toISOString();
        console.log('current time ISO', currentTimeISO);
        const note = {
            name: noteName,
            folderId: '',
            modified: currentTimeISO,
            content: noteContent
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
                <br />
                <label htmlFor="noteContent">Note Content:</label>
                <textarea name="noteContent" id="noteContent" rows="4" cols="50" ref={this.noteContent} />
                <button type="submit">Add Note</button>
            </form>
        );
    }
} 