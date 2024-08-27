const { Category } = require('../models/models');

exports.getCategories = (req, res) => {
    Category.find({})
        .then((categories) => {
            res.json(categories); // Ensure categories are passed here
        })
        .catch((err) => {
            console.error(err); // Log to the console for debugging
            res.status(500).json({ error: 'Error fetching categories' });
        });
};
