import React from "react";
import Header from "../Header";
import '../../styles/author_details.scss'
const AuthorPage = (props) => {
    console.log(props.computedMatch.params.id)
    return(<div /*style={{width:'100%',height:'100%',overflow: 'hidden'}}*/ className='page-container'>
        <Header/>
        <div className="x-container">
            <div className="x-author-info-container">
                <div className="x-image-container">
                    <img src="https://images.penguinrandomhouse.com/cover/9780307237705"/>
                </div>
                <div className="x-author-info">
                    <h3>Ahmed Adel</h3>
                    <h5>01-20-1992</h5>
                    <div className="module line-clamp">
                        <p>sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe  qweqw   qweqw  weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq  q eeqeeqweqwq fd fdsf  saddsa fdsfds dsadas  asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd sad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfdsad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfdsad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfdsad adsdsa wq qwe qweqwe qew wqewqe q weqweewqqwe qweqw qweqw weq wqewq weq wq eq qqwe wqe weq wq wq wq q w we eqeqeq q eeqeeqweqwq fd fdsf saddsa fdsfds dsadas asdffd asdfd</p>
                    </div>

                </div>
            </div>
        </div>
    </div>)
}

export default AuthorPage