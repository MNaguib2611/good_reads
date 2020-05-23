import React from "react";
import {connect} from 'react-redux'
import '../../styles/pagination.scss'
import {Link} from "react-router-dom";
const Pagination = ({page,nextURL,prevURL,hasPrevious,hasNext}) => {
    return(<div className="center">
            <div className="pagination">
                {hasPrevious && <Link to={prevURL}>&laquo;</Link>}
                <a  className="active">{page}</a>
                {hasNext && <Link to={nextURL}>&raquo;</Link>}
            </div>
        </div>)
}

export default Pagination