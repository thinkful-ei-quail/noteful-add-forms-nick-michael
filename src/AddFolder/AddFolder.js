import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'
import ValidationError from '../ValidationError';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folderInput: {value:'', touched: false}
        }
        //this.folderInput = React.createRef();
    }

    static contextType = ApiContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const {folderInput} = this.state;
        console.log(folderInput);

        const folder = { name: folderInput.value }

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

    updateFolderName(folderName){
        this.setState({folderInput:{value: folderName, touched: true}})
    }

    validateName() {
        const folderName = this.state.folderInput.value.trim();
        if (folderName.length === 0){
            return 'Folder name is required';          
        } else if (folderName.length < 3){
            return 'Folder name must be at least 3 characters long';
        }else if (folderName.length >= 12){
            return 'Folder name must be less than 13 characters long';
        }
    }
    
    render() {
        const folderNameError = this.validateName();
        return (
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>New Folder</h2>
                <label htmlFor="folderName">Folder Name:</label>
                <input type="text" name="folderName" id="folderName" onChange={e => this.updateFolderName(e.target.value)} />
                {this.state.folderInput.touched && (<ValidationError message={folderNameError}/>)}
                <button type="submit" disabled={this.validateName()}>Add Folder</button>
            </form>
        );
    }
}