import axios from 'axios';
import {addCategory, editCategory} from '../actions/admin/category';

export function addNewCategory (props, category){
    if (!category.error) {
        console.log(category);
        axios.post('http://localhost:5000/categories/', {name: category.name, withCredentials: true}).then(response => {
            if (response) {
                console.log(response);
                // props.dispatch(addCategory(category));
                // getAllCategories(props);
                props.history.push('/admin/categories/');
            }
        }).catch(error => {
            console.log(error); 
            // props.history.push('/admin/categories/add', {err: 'this Category is already exist'}); 
            props.history.push({
                pathname: '/admin/categories/add',
                customNameData: "this Category is already exist",
              });
        });
    }
}

export function getAllCategories(dispatch){
    axios.get('http://localhost:5000/categories/', {withCredentials: true})
        .then(response => {
            console.log(response.data)
            const categories = response.data;
            categories.map(category => dispatch(addCategory(category)));
        })
        .catch(error => {
            console.log(error)
        })
}

export function editCategoryFun(props, category){
    if (!category.error) {
        console.log(category);
        axios.patch(`http://localhost:5000/categories/${props.category.id}`, {name: category.name, withCredentials: true}).then(response => {
            if (response) {
                console.log(response);
                props.dispatch(editCategory())
                props.history.push('/admin/categories/');
            }
        }).catch(error => {
            console.log(error); 
            // props.history.push('/admin/categories/add', {err: 'this Category is already exist'}); 
            props.history.push({
                pathname: '/admin/categories/add',
                customNameData: "this Category is already exist",
              });
        });
    }
}