import React from 'react';
import '../../../styles/create_author_form.scss';

export default class CategoryForm extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            name: props.category ? props.category.name : '',
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
            <form onSubmit={this.onSubmit} className="form">
                {this.state.error && <p>{this.state.error}</p>}
                <div className="form_container">
                    <h1> Add Category </h1>
                    <input 
                        type="text"
                        placeholder="category name"
                        autoFocus
                        value= {this.state.name}
                        onChange={this.onNameChange}
                        required
                    />
                    <button type="submit" className="submit-btn"> ADD </button>
                </div>
            </form>
        )
    }
}