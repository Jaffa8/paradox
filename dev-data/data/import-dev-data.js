// Run this command on terminal for importing the data
// node dev-data/data/import-dev-data.js --import

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const Question = require('../../models/question.model');



const DB = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.MONGODB_URI
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to DB');
});

// Read questions data from JSON file
const questions = JSON.parse(fs.readFileSync(`${__dirname}/questions.json`, 'utf-8'));

// Function to import data
const importData = async () => {
  try {
    await Question.create(questions);
    console.log('Questions successfully loaded');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

// Function to delete data
const deleteData = async () => {
  try {
    await Question.deleteMany();
    console.log('Questions successfully deleted');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

// Check command line argument and execute import or delete accordingly
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
