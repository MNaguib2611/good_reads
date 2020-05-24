import React, {useState} from "react";
import '../../styles/create_author_form.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
                <h2>Responsive Form</h2>

                <div className="container">
                    <form>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="fname">First Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="lname">Last Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="subject">Subject</label>
                            </div>
                            <div className="col-75">
                                <textarea id="subject" name="subject" placeholder="Write something.."/>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
export default CreateAuthor
