const books = [];

export default function booksOperations(books = [], action) {
    switch(action.type){
        case 'ADD_BOOK':
            return [
                ...books,
                action.book
            ];
        case 'EDIT_BOOK':
            return books.filter(book => {
                if(book._id === action.book._id){
                    return {
                        ...action.book
                    }
                }
            });
        case 'ALL_BOOKS':
            return books = action.books
        case 'REMOVE_BOOK':
            return books.filter(book => book._id != action.book._id);
        default:
            return books;
    }
};