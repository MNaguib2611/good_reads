import React, {useState} from "react";
import '../../../styles/form.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faListUl} from '@fortawesome/free-solid-svg-icons';
import Layout from "../layout";
import {Link} from "react-router-dom";

const EditAuthor = (props) => {
    console.log(props.history.location.state.record)
    const editURL = `${process.env.REACT_APP_BACKEND_URL}/authors/edit/${props.history.location.state.record._id}`;

    const [author, setAuthor] = useState([]);
    const [name, setName] = useState(props.history.location.state.record.name)
    const [image, setImage] = useState(props.history.location.state.record.image)
    const [date, setDate] = useState(new Date())
    const [bio, setBio] = useState(props.history.location.state.record.bio)

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
        let form = new FormData();
        form.append('name', name);
        form.append('dateOfBirth', date);
        form.append('image', image);
        form.append('bio', bio);

        axios.put(editURL, form, {
            withCredentials: true,
        })
            .then((res) => {
                setAuthor([
                    ...author, res.data
                ]);
            })
            .catch((err) => {
                console.log("test", err)
            });
        props.history.push("/authors");
    }

    return (
        <React.Fragment>
            <Layout>
                <div className="card_one">
                    <h5>update Author</h5>
                    <Link to="/authors" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
                </div>
                <div className="card_two">
                    <form onSubmit={handleSubmit}>
                        <div className="form_container">
                            <input type="text" name="name"
                                   value={name}
                                   placeholder="Enter author name"
                                   onChange={onChangeName} required/>

                            <DatePicker name="dateOfBirth"
                                        selected={date}
                                        onChange={onChangeBirthDate}
                            />

                            <input type="file" name="image" id="file" onChange={onChangeImage}
                                   className="input-file"/>
                            <label htmlFor="file" className="file-label"><FontAwesomeIcon icon={faImage}/>
                                Choose a photo</label>

                            <textarea name="bio" placeholder="Write author's bio"
                                      value={bio} onChange={onChangeBio} required/>

                            <button type="submit" className="submit-btn">Update</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default EditAuthor
