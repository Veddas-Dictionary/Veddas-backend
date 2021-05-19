const Word= require('../models/word.model.js');

// Create and Save a new Word
exports.create = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    // Validate request because in model we required the title
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter word title."
        });
    }

    // Create a Word
    const word = new Word({
        title: req.body.title,
        description: req.body.description,
        closingDate: req.body.requirements
    });

    // Save Word
    word.save()
        .then(oWord => {
            res.send(oWord);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Word."
        });
    });
};

// Get all and return all words.
exports.getAll = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Word.find()
        .then(oWord => {
            res.send(oWord);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the word."
        });
    });
};

// Get a single word with a wordId
exports.getById = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Word.findById(req.params.wordId)
        .then(oWord => {
            if(oWord) {
                res.send(oWord);
            }
            return res.status(404).send({
                message: "Word not exist with id " + req.params.wordId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Word not exist with id " + req.params.wordId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while retrieving the word with wordId " + req.params.wordId
        });
    });
};

// Update a word by the wordId
exports.update = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    // Validate Request because title is required
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter word title."
        });
    }

    // Find word and update it
    Word.findByIdAndUpdate(req.params.wordId, {
        title: req.body.title,
        author: req.body.author || "IT jugadu"
    }, {new: true})
        .then(oWord => {
            if(oWord) {
                res.send(oWord);
            }
            return res.status(404).send({
                message: "Word does not exist with wordId " + req.params.wordId
            });

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Word does not exist with wordId " + req.params.wordId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while updating the word with wordId" + req.params.wordId
        });
    });
};

// Delete the Word with the wordId
exports.delete = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Word.findByIdAndRemove(req.params.wordId)
        .then(oWord => {
            if(oWord) {
                res.send({message: "Word has been deleted successfully!"});
            }
            return res.status(404).send({
                message: "Word not exist with wordId" + req.params.wordId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Word not exist with wordId" + req.params.wordId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while deleting the word with wordId" + req.params.wordId
        });
    });
};
