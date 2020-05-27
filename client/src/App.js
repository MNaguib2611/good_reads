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
import EditAuthor from "./components/admin/author/EditAuthor";
import Books from "./components/admin/book/books";
import AddBook from "./components/admin/book/addBook";
import EditBook from "./components/admin/book/editBook";
import Book from "./components/book/book";
import Unauthorized from './components/unauthorized/Unauthorized';
import AddCategory from './components/admin/category/AddCategory';
import EditCategory from './components/admin/category/editCategory';
import DeleteCategory from './components/admin/category/deleteCategory';
import ListAllCategories from './components/admin/category/listAllCategories';
import CategoryBooks from './components/admin/category/categoryBooks';
import ListAllComments from './components/comments/listBookComments';
import AddBookComment from './components/comments/commentForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SearchResultPage from "./components/search_bar/SearchResultPage";
import CategoriesPage from "./components/category/CategoriesPage";
import GetAllAuthors from "./components/userlistauthor/UserListAuthor";
import AuthorPage from "./components/user_author/AuthorPage";


function App() {
   
    return (
        <Router>
            <Switch>
                    {/* routes available for all */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path='/admin/books' component={Books} />
                    <Route exact path='/author-list' component={GetAllAuthors} />
                    <Route exact path='/unauthorized' component={Unauthorized}/>


                {/* route available only if NOT authenticated */}
                    <GuestRoute exact path='/login'  component={Login}/>
                    <GuestRoute exact path='/register'  component={Register}/>


                     {/* route available only if  authenticated */}
                    <ProtectedRoute exact path='/my_books' component={MyBooksPage}/>
                    <ProtectedRoute exact path='/search_results' component={SearchResultPage}/>
                    <ProtectedRoute exact path='/categories' component={CategoriesPage}/>
                    <ProtectedRoute exact path='/categories/:id'  component={CategoryBooks}/>
                    <ProtectedRoute exact path='/books/:id' component={Book} />
                    {/*<ProtectedRoute exact path='/books/comment/:bookId' component={AddBookComment} />
                    <ProtectedRoute exact path='/books/:bookId' component={ListAllComments} />*/}
                    <ProtectedRoute exact path='/authors/:id' component={AuthorPage} />

                    {/* routes available for admins only */}
                    <AdminRoute exact path='/admin' component={ListAllCategories}/>
                    <AdminRoute exact path='/admin/books' component={Books} />
                    <AdminRoute exact path="/admin/books/add" component={AddBook} />
                    <AdminRoute exact path="/admin/books/edit" component={EditBook} />
                    <AdminRoute exact path='/admin/categories/' component={ListAllCategories} />
                    <AdminRoute exact path='/admin/categories/add' component={AddCategory} />
                    <AdminRoute exact path='/admin/categories/edit' component={EditCategory} />
                    <AdminRoute exact path='/admin/categories/delete' component={DeleteCategory} />

                    <AdminRoute exact path="/admin/authors" component={ListAuthors} />
                    <AdminRoute exact path="/admin/authors/add" component={CreateAuthor} />
                    <AdminRoute exact path="/admin/authors/delete" component={DeleteAuthor} />
                    <AdminRoute exact path="/admin/authors/edit" component={EditAuthor} />
            </Switch>
        </Router>
    );
}

export default App;
