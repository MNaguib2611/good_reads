import React from 'react';

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
        console.log(this.state.name);
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        
        this.props.onSubmit({
            name: this.state.name,
            error: ''
        })
    };

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Name"
                        autoFocus
                        value= {this.state.name}
                        onChange={this.onNameChange}
                    />
                    <button> ADD </button>
                </form>
            </div>
        )
    }
}