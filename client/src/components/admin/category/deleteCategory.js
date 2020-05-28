import { connect } from 'react-redux';
import { deleteCategoryFun } from '../../../API/category';

const DeleteCategoryPage = (props) => {
    console.log(props);
    deleteCategoryFun(props);
    return true;
};

export default connect()(DeleteCategoryPage);