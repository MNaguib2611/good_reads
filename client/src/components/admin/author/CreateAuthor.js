import React, {useState} from "react";
import '../../../styles/create_author_form.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faListUl} from '@fortawesome/free-solid-svg-icons';
import Layout from "../layout";
import {Link} from "react-router-dom";

const CreateAuthor = (props) => {

    const createURL = `${process.env.REACT_APP_BACKEND_URL}/authors/add/`;

    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [date, setDate] = useState(new Date())
    const [bio, setBio] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [imageErr, setImageErr] = useState('')
    const [dateErr, setDateErr] = useState('')
    const [bioErr, setBioErr] = useState('')


    const onChangeName = (e) => {
        const {target: {value}} = e;
        setName(value);
    }

    const onChangeBirthDate = date => setDate(date);

    const onChangeBio = (e) => {
        const {target: {value}} = e;
        setBio(value);
    }

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !date || !image || !bio) {
            name ? setNameErr("") : setNameErr("Please enter author name");
            date ? setDateErr("") : setDateErr("Please choose a birth-date");
            image ? setImageErr("") : setImageErr("Please choose a picture");
            bio ? setBioErr("") : setBioErr("Please write a bio for author");
            return
        } else {
            setNameErr("")
            setDateErr("")
            setBioErr("")
            let form = new FormData();
            form.append('name', name);
            form.append('dateOfBirth', date);
            form.append('image', image);
            form.append('bio', bio);

            axios.post(createURL, form, {
                withCredentials: true,
            })
                .then((res) => {
                    setAuthors([
                        ...authors, res.data
                    ]);
                })
                .catch((err) => {
                    console.log("test", err)
                });
        }
        props.history.push("/authors");
    }

    return (
        <React.Fragment>
            <Layout>
                <div className="card_one">
                    <h5>Add Author</h5>
                    <Link to="/authors" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
                </div>
                <div className="card_two">
                    <form onSubmit={handleSubmit}>
                        <div className="form_container">
                            <input type="text" name="name"
                                   placeholder="Enter author name"
                                   onChange={onChangeName} required/>
                            <p style={{color: "red", fontSize: '12px'}}>{nameErr}</p>

                            <DatePicker name="dateOfBirth"
                                        selected={date}
                                        onChange={onChangeBirthDate}
                            />
                            <p style={{color: "red", fontSize: '12px'}}>{dateErr}</p>

                            <input type="file" name="image" id="file" onChange={onChangeImage}
                                   className="input-file"/>
                            <label htmlFor="file"><FontAwesomeIcon icon={faImage}/>
                                Choose a photo</label>
                            <p style={{color: "red", fontSize: '12px'}}>{imageErr}</p>

                            <textarea name="bio" placeholder="Write author's bio"
                                      onChange={onChangeBio} required/>
                            <p style={{color: "red", fontSize: '12px'}}>{bioErr}</p>

                            <button type="submit" className="submit-btn">Add</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default CreateAuthor
