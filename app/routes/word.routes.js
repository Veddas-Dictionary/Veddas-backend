module.exports = (app) => {
    const words = require('../controllers/word.controller.js');

    // Create a new Word
    app.post('/words', words.create);

    // Get all Words
    app.get('/words', words.getAll);

    // Get words by a search
    app.get('/search/:searchTerm',words.search);

    // Get a single Word with wordId
    app.get('/words/:wordId', words.getById);

    // Update a Word with wordId
    app.put('/words/:wordId', words.update);

    // Delete a Word with wordId
    app.delete('/words/:wordId', words.delete);
}
