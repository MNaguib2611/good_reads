import React from "react";
import '../../styles/pagination.scss'
import {Link} from "react-router-dom";
const Pagination = ({page,nextURL,prevURL,hasPrevious,hasNext}) => {
    return(<div className="center">
            <div className="pagination">
                {hasPrevious && <Link to={prevURL}>&laquo;</Link>}
                {(hasPrevious || hasNext) && <a className="active">{page}</a>}
                {hasNext && <Link to={nextURL}>&raquo;</Link>}
            </div>
        </div>)
}

export default Pagination