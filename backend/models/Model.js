const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: Array,
  instructions: Array
});

module.exports = mongoose.model('Recipe', recipeSchema);