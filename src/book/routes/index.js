var express = require('express');
var router = express.Router();

const bookCtrl = require('../controllers/bookController')


//  GET ALL BOOKS
router.get('/api/books', bookCtrl.allBooks);

// // GET SINGLE BOOK
router.get('/api/books/:book_id', bookCtrl.findBook);

// GET BOOK BY AUTHOR
router.get('/api/books/author/:author', bookCtrl.findBookByAuthor);

// // CREATE BOOK
router.post('/api/books', bookCtrl.addBook);

// // UPDATE THE BOOK
router.put('/api/books/:book_id', bookCtrl.updateBook);

// // DELETE BOOK
// router.delete('/api/books/:book_id', bookCtrl);

module.exports = router;