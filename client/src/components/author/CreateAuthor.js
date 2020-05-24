import React, {useState} from "react";
import '../../styles/create_author_form.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const CreateAuthor = (props) => {

    const initialAuthorState = {
        name: '',
        bio: '',
        // popularity: 0,
        dateOfBirth: new Date(),
        image: null
    }

    const [author, setAuthor] = useState(initialAuthorState);

    const onChangeName = e => setAuthor({
        ...author,
        name: e.target.value
    })

    const onChangeBio = e => setAuthor({
        ...author,
        bio: e.target.value
    })

    const onChangeImage = e => {
        setAuthor({
            ...author,
            image: e.target.files[0]
        })
    }

    const onChangeBirthDate = date => setAuthor({
        ...author,
        dateOfBirth: date
    })

    return (
        <React.Fragment>
            <div className="main">
                <form>
                    <div className="container">
                        <h1>Create Author</h1>

                        <input type="text" placeholder="Enter author name" value={author.name} onChange={onChangeName}
                               required/>

                        <DatePicker
                            selected={author.dateOfBirth}
                            onChange={onChangeBirthDate}
                        />
                        <input type="file" id="file" className="input-file"/>
                        <label htmlFor="file"><FontAwesomeIcon icon={faImage}/>  Choose a photo</label>

                        <textarea placeholder="Write author's bio" value={author.bio} onChange={onChangeBio} required/>
                        <button type="submit" className="register-btn">Add</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default CreateAuthor
