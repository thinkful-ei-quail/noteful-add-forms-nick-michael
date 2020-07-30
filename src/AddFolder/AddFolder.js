import React, { Component } from 'react';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: {
                name: ''
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formName = event.target.folderName.value;
        console.log(formName);
    }

    render() {
        return (
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>New Folder</h2>
                <label htmlFor="folderName">Folder Name:</label>
                <input type="text" name="folderName" id="folderName" />
                <button type="submit">Add Folder</button>
            </form>
        );
    }
}