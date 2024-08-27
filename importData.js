const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('./db');
const { Company, Category, Product } = require('./models/models');

const API_URL = 'https://json-server-c67opnddza-el.a.run.app/';

async function fetchData() {
    try {
        const [companies, categories, products] = await Promise.all([
            axios.get(`${API_URL}/companies`),
            axios.get(`${API_URL}/categories`),
            axios.get(`${API_URL}/products`)
        ]);

        await connectDB();

        // Insert data into MongoDB
        await Company.insertMany(companies.data);
        await Category.insertMany(categories.data);
        await Product.insertMany(products.data);

        console.log('Data successfully populated to MongoDB');
    } catch (error) {
        console.error('Failed to fetch or populate data:', error);
    } finally {
        mongoose.disconnect();
    }
}

fetchData();
