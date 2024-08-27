const { Company } = require('../models/models');

exports.getCompanies = (req, res) => {
    Company.find({})
        .then((companies) => {
            res.json(companies); // Pass companies to res.json to ensure it's sent back to the client
        })
        .catch((err) => {
            console.error(err); // It's good practice to use console.error for logging errors
            res.status(500).json({ error: 'Error fetching companies' });
        });
};
