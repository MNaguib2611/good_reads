import React,{useState, useEffect} from "react";
import '../../styles/search.scss'
import BookSearchCard from "./BookSearchCard";
import AuthorSearchCard from "./AuthorSearchCard";
import CategorySearchCard from "./CategorySearchCard";
import {connect} from 'react-redux'
import {search} from "../../API/search_api";
import {clearStore} from "../../actions/search_action";
import {Link,withRouter} from "react-router-dom";
import {saveOldResults} from "../../actions/search_action";

const SearchBar = (props) => {
    const {location:{pathname}} = props;
    useEffect(()=>{
        if(pathname === "/search_results") {
            props.dispatch(saveOldResults())
        } else {
            props.dispatch(clearStore())
        }
    },[pathname])

    const {result} = props
    const [searchValue,setSearchValue] = useState("");
    const handleChangeInput = (e) => {
        let {target:{value}} = e;
        value = value.trim()
        setSearchValue(value)
        props.dispatch(clearStore())
        if(value.length === 0) {
            return
        }
        props.search(value)
    }
    return (<div className="search-container">
        <input className="search-input" value={searchValue} onChange={handleChangeInput} placeholder="search Books, Categories, Authors"/>
        <div className="search-result">
            {

                result.map((item, index) => {
                    if(index>=3){
                        return ;
                    }
                    switch (item.type) {
                        case 'Book':
                            return    <Link  to={`/books/${item._id}`}><BookSearchCard key={item._id} book={item}/></Link>
                        case 'Author':
                            return   <Link  to={`/authors/${item._id}`}><AuthorSearchCard key={item._id} author={item}/></Link>
                        case 'Category':
                            return  <Link  to={`/categories/${item._id}`}><CategorySearchCard key={item._id} category={item}/></Link>
                        default:
                            return <></>
                    }

                })
            }

            {(result.length>3) && <div className="more-results-container">
                <Link to="/search_results">See All Results</Link>
            </div>}


        </div>
    </div>)
}

const mapStateToProps = (state) => {

    return {
        result: state.searchReducer.result,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: search(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SearchBar))