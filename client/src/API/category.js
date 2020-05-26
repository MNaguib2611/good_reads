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
            if (response.data.length == 0) {
                // const error = "No Categories found"
                // dispatch(addCategory(error))
            }
            const categories = response.data;
            categories.map(category => dispatch(addCategory(category)));
        })
        .catch(error => {
            console.log(error)
        })
}

export function editCategoryFun(props, category){
    if (!category.error) {
        axios.patch(`http://localhost:5000/categories/${props.location.state.record.id}`, {name: category.name, withCredentials: true}).then(response => {
            if (response) {
                console.log(response);
                props.dispatch(editCategory())
                props.history.push('/admin/categories/');
            }
        }).catch(error => {
            console.log(error); 
            // props.history.push('/admin/categories/add', {err: 'this Category is already exist'}); 
            props.history.push({
                pathname: '/admin/categories/',
                customNameData: "this Category is already exist",
              });
        });
    }
}

export function deleteCategoryFun(props){
    axios.delete(`http://localhost:5000/categories/${props.location.state.record.id}`, {name: props.location.state.record.name, withCredentials: true}).then(response => {
        if (response) {
            console.log(response);
            props.dispatch(editCategory())
            props.history.push('/admin/categories/');
        }
    }).catch(error => {
        console.log(error); 
        props.history.push({
            pathname: '/admin/categories/',
            customNameData: "error while deleting category",
        });
    });
}

// export function getCategoryBooks(props){
//     console.log(props);
//     let data
//     axios.get("http://localhost:5000/categories/5ecb8027a4eedd1bfb6d9547", {withCredentials: true}).then(response => {
//         data = response.data;
//         console.log(data);
//     }).catch(error => {
//         console.log(error); 
//         data = "error while getting books"
//     });
//     return data;
// }