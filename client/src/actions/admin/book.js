export function addBook(book) {
    return {
        type: 'ADD_BOOK',
        book
    }
}

export function editBook(book) {
    return {
        type: 'EDIT_BOOK',
        book
    }
}

export function retrieveBooks(books) {
    return {
        type: 'ALL_BOOKS',
        books
    }
}

export function deleteBook(book) {
    return {
        type: 'REMOVE_BOOK',
        book
    }
}