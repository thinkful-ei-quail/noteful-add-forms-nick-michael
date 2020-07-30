import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.folderInput = React.createRef();
    }

    static contextType = ApiContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const folderName = this.folderInput.current.value;
        console.log(folderName);

        const folder = { name: folderName }

        fetch(`${config.API_ENDPOINT}/folders/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        }
        )
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then((data) => {
                this.context.addFolder(data)
                this.props.history.push(`/`)
            })
            .catch(error => {
                console.error({ error })
            })
    }


    render() {
        return (
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>New Folder</h2>
                <label htmlFor="folderName">Folder Name:</label>
                <input type="text" name="folderName" id="folderName" ref={this.folderInput} />
                <button type="submit">Add Folder</button>
            </form>
        );
    }
}