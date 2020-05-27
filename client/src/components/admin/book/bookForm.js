import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/form.scss';


const bookForm = ({ book, setBook, handleSubmit, fileInput, errors, categories, authors, operation }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form_container">
                <input type="text" placeholder="Enter book name" value={book.name} onChange={event => setBook({...book, name: event.target.value})} style={{border: errors && '1px red solid'}} />
                <select name="category" id="category" value={book.category} onChange={event => setBook({...book, category: event.target.value})} style={{border: errors && '1px red solid'}} >
                    <option disabled selected value="volvo">Select category</option>
                    {
                        categories.map(category => {
                            return <option value={category.id}>{category.name}</option>;
                        })
                    }
                </select>
                <select name="author" id="author" value={book.author} onChange={event => setBook({...book, author: event.target.value})} style={{border: errors && '1px red solid'}} >
                    <option disabled selected value="volvo">Select author</option>
                    {
                        authors.map(author => {
                            return <option value={author.id}>{author.name}</option>;
                        })
                    }
                </select>
                <input type="file" id="file" className="input-file" ref={fileInput}/>
                <label htmlFor="file" className="file-label"><FontAwesomeIcon icon={faImage}/>  Select book photo</label>

                <textarea placeholder="Write book's description" value={book.description} onChange={event => setBook({...book, description: event.target.value})}/>
                <button type="submit" className="submit-btn">{operation}</button>
            </div>
        </form>
    );
};

export default bookForm;