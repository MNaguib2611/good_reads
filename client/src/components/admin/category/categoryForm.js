import React from 'react';
import {addNewCategory} from '../../../API/category'

export default class CategoryForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            error: ''
        };
    }

    onNameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({name}))   
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState(() => ({ error: 'Please provide category name.' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                name: this.state.name,
            })
            this.setState(()=>({name: ""}))
        }
    };

    render(){
        return(
            <div>
                <div className="container">
                    <h2 className="header"> Add Category </h2>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onSubmit} className="form">
                        <input 
                            type="text"
                            placeholder="Name"
                            autoFocus
                            value= {this.state.name}
                            onChange={this.onNameChange}
                        />
                        <button className="submitBtn"> ADD </button>
                    </form>
                </div>
            </div>
        )
    }
}