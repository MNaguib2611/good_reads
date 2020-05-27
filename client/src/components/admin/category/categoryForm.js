import React from 'react';
import '../../../styles/create_author_form.scss';
import '../../../styles/reviews.scss';

export default class CategoryForm extends React.Component{
    constructor(props){
        super(props);
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
            setTimeout(()=>{
                this.setState(() => ({ error: '' }));
            }, 3000)
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
                {this.state.error && <p className="error">{this.state.error}</p>}
                <div className="form_container">
                    <h1> {this.props.category ? "Edit Category" : "Add Category"}  </h1>
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