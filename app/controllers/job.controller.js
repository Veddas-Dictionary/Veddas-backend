const Job= require('../models/job.model.js');

// Create and Save a new Job
exports.create = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    // Validate request because in model we required the title
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter job title."
        });
    }

    // Create a Job
    const job = new Job({
        title: req.body.title,
        description: req.body.description,
        closingDate: req.body.requirements
    });

    // Save Job
    job.save()
        .then(oJob => {
            res.send(oJob);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Job."
        });
    });
};

// Get all and return all jobs.
exports.getAll = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Job.find()
        .then(oJob => {
            res.send(oJob);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the job."
        });
    });
};

// Get a single job with a jobId
exports.getById = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Job.findById(req.params.jobId)
        .then(oJob => {
            if(oJob) {
                res.send(oJob);
            }
            return res.status(404).send({
                message: "Job not exist with id " + req.params.jobId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Job not exist with id " + req.params.jobId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while retrieving the job with jobId " + req.params.jobId
        });
    });
};

// Update a job by the jobId
exports.update = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    // Validate Request because title is required
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter job title."
        });
    }

    // Find job and update it
    Job.findByIdAndUpdate(req.params.jobId, {
        title: req.body.title,
        author: req.body.author || "IT jugadu"
    }, {new: true})
        .then(oJob => {
            if(oJob) {
                res.send(oJob);
            }
            return res.status(404).send({
                message: "Job does not exist with jobId " + req.params.jobId
            });

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Job does not exist with jobId " + req.params.jobId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while updating the job with jobId" + req.params.jobId
        });
    });
};

// Delete the Job with the jobId
exports.delete = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Job.findByIdAndRemove(req.params.jobId)
        .then(oJob => {
            if(oJob) {
                res.send({message: "Job has been deleted successfully!"});
            }
            return res.status(404).send({
                message: "Job not exist with jobId" + req.params.jobId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Job not exist with jobId" + req.params.jobId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while deleting the job with jobId" + req.params.jobId
        });
    });
};
