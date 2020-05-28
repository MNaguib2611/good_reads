import React,{useEffect} from "react";
import Header from "../Header";
import {connect} from 'react-redux'
import BookSearchCard from "./BookSearchCard";
import AuthorSearchCard from "./AuthorSearchCard";
import CategorySearchCard from "./CategorySearchCard";
import {clearOldResults,clearStore} from "../../actions/search_action";
const SearchResultPage = ({results,dispatch}) => {
    useEffect(()=>{
        return ()=>{
            dispatch(clearOldResults())
            dispatch(clearStore())

        }
    },[])
    return(<div>
        <Header/>
        <div className="results-container">
            {results.map((item, index) => {
                switch (item.type) {
                    case 'Book':
                        return  <BookSearchCard key={item._id} book={item}/>
                    case 'Author':
                        return  <AuthorSearchCard key={item._id} author={item}/>
                    case 'Category':
                        return  <CategorySearchCard key={item._id} category={item}/>
                    default:
                        return <></>
                }

            })}
        </div>
    </div>)
}

const mapStateToProps = (state) => {

    return {
        results: state.searchReducer.oldResults,
    }
}
export default connect(mapStateToProps)(SearchResultPage)