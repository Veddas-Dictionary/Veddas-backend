module.exports = (app) => {
    const words = require('../controllers/word.controller.js');

    // Create a new Book
    app.post('/words', words.create);

    // Get all Books
    app.get('/words', words.getAll);

    // Get a single Book with wordId
    app.get('/words/:wordId', words.getById);

    // Update a Book with wordId
    app.put('/words/:wordId', words.update);

    // Delete a Book with wordId
    app.delete('/words/:wordId', words.delete);
}
