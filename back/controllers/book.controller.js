import Book from "../models/book.model"


// Create
export async function create(book) {
    const newBook = new Book(book);

    newBook.save()

    return newBook
}

// Read
export async function findAll() {
    const books = await Book.find()

    return books
}

export async function findByUserId(userId) {
    const book = await Book.find({user:userId})

    return book
}



// update

export async function update (id, update) {
    const updatedBook = await Book.findOneAndUpdate({_id: id}, update);

    return updatedBook
}
export async function updateByUser (userId, update) {
    const updatedBook = await Book.findOneAndUpdate({user: userId}, update);

    return updatedBook
}

// Delete

export async function removeByUserId (userId) {
    const removedBook = await Book.remove({user: userId}, update);

    return removedBook
}
export async function removeById (id) {
    const removedBook = await Book.remove({_id: id}, update);

    return removedBook
}

