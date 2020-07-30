import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.noteInput = React.createRef();
        this.noteContent = React.createRef();
        this.folderId = React.createRef();
    }

    static contextType = ApiContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const noteName = this.noteInput.current.value;
        const noteContent = this.noteContent.current.value;
        const folderId = this.folderId.current.value;
        const currentTime = new Date();
        console.log('current time', currentTime);
        const currentTimeISO = currentTime.toISOString();
        console.log('current time ISO', currentTimeISO);
        console.log(folderId);
        const note = {
            name: noteName,
            folderId: folderId,
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
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then((data) => {
                this.context.addNote(data)
                this.props.history.push(`/`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { folders } = this.context;
        console.log(folders);
        return (
            <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
                <h2>New Note</h2>
                <label htmlFor="noteName">Note Name:</label>
                <input type="text" name="noteName" id="noteName" ref={this.noteInput} />
                <br />
                <label htmlFor="noteContent">Note Content:</label>
                <textarea name="noteContent" id="noteContent" rows="4" cols="50" ref={this.noteContent} />
                <label htmlFor='folderName'>Choose Folder:</label>
                
                <select name='folderName' id='folderName' ref={this.folderId}>
                    {folders.map(folder =>
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                    )}

                </select>


                <button type="submit">Add Note</button>
            </form>
        );
    }
} 