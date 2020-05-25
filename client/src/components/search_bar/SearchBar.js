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
        }
    },[])

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
        <input className="search-input" value={searchValue} onChange={handleChangeInput} placeholder="search Books, Categories, ListAuthors"/>
        <div className="search-result">
            {

                result.map((item, index) => {
                    if(index>=3){
                        return ;
                    }
                    switch (item.type) {
                        case 'Book':
                            return  <BookSearchCard key={item._id} book={item}/>
                        case 'Author':
                            return  <AuthorSearchCard key={item._id} author={item}/>
                        case 'Category':
                            return  <CategorySearchCard key={item._id} category={item}/>
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