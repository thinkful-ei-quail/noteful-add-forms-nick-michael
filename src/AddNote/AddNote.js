import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import ValidationError from '../ValidationError';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteInput: {value:'', touched: false},
            noteContent: {value:'', touched: false},
            folderId: {value: '', touched: false}
        }
    }

    static contextType = ApiContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const noteName = this.state.noteInput.value;
        const noteContent = this.state.noteContent.value;
        const folderId = this.state.folderId.value;
        const currentTime = new Date();
        console.log(noteName, noteContent, folderId);
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

    updateNoteName = (name) => {
        this.setState({
            noteInput: {value: name, touched: true}
        });
    }

    updateNoteContent = (cont) => {
        this.setState({
            noteContent: {value: cont, touched: true}
        });
    }

    updateFolderId = (id) => {
        this.setState({
            folderId: {value: id, touched: true}
        });
    }

    validateNoteName() {
        const noteName = this.state.noteInput.value.trim();
        if (noteName.length === 0){
            return 'Note name is required';          
        } else if (noteName.length < 3){
            return 'Note name must be at least 3 characters long';
        } else if (noteName.length >= 12){
            return 'Note name must be less than 13 characters long';
        }
    }

    validateNoteContent() {
        const noteContent = this.state.noteContent.value.trim();
        if (noteContent.length === 0) {
            return 'Note content cannot be left empty.'; 
        }       
    }

    validateFolderId() {
        const folderId = this.state.folderId.value;
        if (folderId.length === 0) {
            return 'Must select folder';
        }
    }


    render() {
        const { folders } = this.context;
        console.log(folders);
        const valName = this.validateNoteName();
        const valCont = this.validateNoteContent();
        const valFolderId = this.validateFolderId();
        return (
            <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
                <h2>New Note</h2>
                <label htmlFor="noteName">Note Name:</label>
                <input type="text" name="noteName" id="noteName" onChange={e => this.updateNoteName(e.target.value)} />
                {this.state.noteInput.touched && (<ValidationError message={valName} />)}
                <br />
                <label htmlFor="noteContent">Note Content:</label>
                <textarea name="noteContent" id="noteContent" rows="4" cols="50" onChange={e => this.updateNoteContent(e.target.value)} />
                {this.state.noteContent.touched && (<ValidationError message={valCont} />)}
                <label htmlFor='folderName'>Choose Folder:</label>
                <select name='folderName' id='folderName' onChange={e => this.updateFolderId(e.target.value)}>
                    {folders.map(folder =>
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                    )}
                </select>
                {this.state.folderId.touched && (<ValidationError message={valFolderId} />)}
                <button 
                    type="submit"
                    disabled={
                        this.validateNoteName() ||
                        this.validateNoteContent() ||
                        this.validateFolderId()
                    }
                >
                    Add Note
                </button>
            </form>
        );
    }
} 