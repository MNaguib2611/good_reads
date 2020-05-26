import React from 'react';
import Home from "./components/home/Home";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
import CreateAuthor from "./components/admin/author/CreateAuthor";
import ListAuthors from './components/admin/author/ListAuthors';
import DeleteAuthor from "./components/admin/author/DeleteAuthor";
import Books from "./components/admin/book/books";
import AddBook from "./components/admin/book/addBook";
import EditBook from "./components/admin/book/editBook";
import Unauthorized from './components/unauthorized/Unauthorized';
import AddCategory from './components/admin/category/AddCategory';
import EditCategory from './components/admin/category/editCategory';
import DeleteCategory from './components/admin/category/deleteCategory';
import ListAllCategories from './components/admin/category/listAllCategories';
import CategoryBooks from './components/admin/category/categoryBooks';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SearchResultPage from "./components/search_bar/SearchResultPage";
import CategoriesPage from "./components/category/CategoriesPage";


function App() {
   
    return (
        <Router>
            <Switch>
                    {/* routes available for all */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/create-author" component={CreateAuthor}/>
                    <Route exact path='/admin/books' component={Books} />
                    <Route exact path='/unauthorized' component={Unauthorized}/>
                    <Route exact path="/authors" component={ListAuthors} />
                    <Route exact path="/delete-author" component={DeleteAuthor} />


                {/* route available only if NOT authenticated */}
                    <GuestRoute exact path='/login'  component={Login}/>
                    <GuestRoute exact path='/register'  component={Register}/>


                     {/* route available only if  authenticated */}
                    <ProtectedRoute exact path='/my_books' component={MyBooksPage}/>
                    <ProtectedRoute exact path='/search_results' component={SearchResultPage}/>
                    <ProtectedRoute exact path='/categories' component={CategoriesPage}/>
                    <ProtectedRoute exact path='/categories/books'  component={CategoryBooks}/>
                    <ProtectedRoute exact path='/admin/categories/' component={ListAllCategories} />
                    <ProtectedRoute exact path='/admin/categories/add' component={AddCategory} />
                    <ProtectedRoute exact path='/admin/categories/edit' component={EditCategory} />
                    <ProtectedRoute exact path='/admin/categories/delete' component={DeleteCategory} />

                    {/* routes available for admins only */}
                    <AdminRoute exact path='/admin'  component={Home}/>
                    <AdminRoute exact path='/admin/books' component={Books} />
                    <AdminRoute exact path="/add-author" component={CreateAuthor} />
                    <AdminRoute exact path="/admin/books/add" component={AddBook} />
                    <AdminRoute exact path="/admin/books/edit" component={EditBook} />
            </Switch>
        </Router>
    );
}

export default App;
