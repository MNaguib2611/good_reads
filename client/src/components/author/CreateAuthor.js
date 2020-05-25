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
        dateOfBirth: new Date(),
        image: null
    }

    const createURL=`${process.env.REACT_APP_BACKEND_URL}/authors/add`;

    const [author, setAuthor] = useState(initialAuthorState);
    const [nameErr, setNameErr] = useState('')
    const [imageErr, setImageErr] = useState('')
    const [dateErr, setDateErr] = useState('')
    const [bioErr, setBioErr] = useState('')

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!author.name || !author.dateOfBirth || !author.image || !author.bio) {
            author.name ? setNameErr("") : setNameErr("Please enter author name");
            author.dateOfBirth ? setDateErr("") : setDateErr("Please choose a birth-date");
            author.image ? setImageErr("") : setImageErr("Please choose a picture");
            author.bio ? setBioErr("") : setBioErr("Please write a bio for author");
            return
        }
        else {
            setNameErr("")
            setDateErr("")
            setBioErr("")
            let form = new FormData();
            form.append('name', author.name);
            form.append('dateOfBirth', author.dateOfBirth);
            form.append('image', author.image);
            form.append('bio', author.bio);

            axios.post(createURL, form,{
                withCredentials: true ,
            })
                .then((res) => {
                    setAuthor([
                        ...author, res.data
                    ]);
                })
                .catch((err) => {
                    console.log("test", err)
                });
        }
        window.location = '/';
    }

    return (
        <React.Fragment>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>Create Author</h1>

                        <input type="text" placeholder="Enter author name" value={author.name} onChange={onChangeName}
                               required/>

                        <DatePicker
                            selected={author.dateOfBirth}
                            onChange={onChangeBirthDate}
                        />
                        <input type="file" id="file" className="input-file"/>
                        <label htmlFor="file" className="file-label"><FontAwesomeIcon icon={faImage}/>  Choose a photo</label>

                        <textarea placeholder="Write author's bio" value={author.bio} onChange={onChangeBio} required/>
                        <button type="submit" className="register-btn">Add</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default CreateAuthor
