import React,{useState} from "react";
import '../../styles/search.scss'
import BookSearchCard from "./BookSearchCard";
import AuthorSearchCard from "./AuthorSearchCard";
import CategorySearchCard from "./CategorySearchCard";
import {connect} from 'react-redux'
import {search} from "../../API/search_api";
import {clearStore} from "../../actions/search_action";

const SearchBar = (props) => {
    const {result} = props
    const [searchValue,setSearchValue] = useState("");

    const handleChangeInput = (e) => {
        let {target:{value}} = e;
        console.log(value)
        value = value.trim()
        setSearchValue(value)
        props.dispatch(clearStore())
        if(value.length === 0)
        {
            return
        }
        props.search(value)
    }
    return (<div className="search-container">
        <input className="search-input" value={searchValue} onChange={handleChangeInput} placeholder="search Books, Categories, ListAuthors"/>
        <div className="search-result">
            {
                result.map((item) => {
                    switch (item.type) {
                        case 'Book':
                            return <BookSearchCard book={item}/>
                        case 'Author':
                            return <AuthorSearchCard author={item}/>
                        case 'Category':
                            return <CategorySearchCard category={item}/>
                    }
                })
            }



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

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)