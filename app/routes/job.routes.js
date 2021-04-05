module.exports = (app) => {
    const jobs = require('../controllers/job.controller.js');

    // Create a new Book
    app.post('/jobs', jobs.create);

    // Get all Books
    app.get('/jobs', jobs.getAll);

    // Get a single Book with jobId
    app.get('/jobs/:jobId', jobs.getById);

    // Update a Book with jobId
    app.put('/jobs/:jobId', jobs.update);

    // Delete a Book with jobId
    app.delete('/jobs/:jobId', jobs.delete);
}
