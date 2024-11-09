const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Load quotes from JSON file
const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));

// Function to get a random quote from a category
function getRandomQuote(category) {
  const categoryQuotes = quotes[category];
  if (!categoryQuotes) {
    return { error: 'Category not found' };
  }
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  return categoryQuotes[randomIndex];
}

// Route to get a random quote from all categories
app.get('/api/quote', (req, res) => {
  const allCategories = Object.keys(quotes);
  const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
  const quote = getRandomQuote(randomCategory);
  res.json({ category: randomCategory, quote: quote });
});

// Route to get random "bucin" quote
app.get('/api/quote/bucin', (req, res) => {
  const quote = getRandomQuote("bucinQuotes");
  res.json(quote);
});

// Route to get random "kehidupan" quote
app.get('/api/quote/kehidupan', (req, res) => {
  const quote = getRandomQuote("kehidupanQuotes");
  res.json(quote);
});

// Route to get random "galau" quote
app.get('/api/quote/galau', (req, res) => {
  const quote = getRandomQuote("galauQuotes");
  res.json(quote);
});

// Route to get random "affirmation" quote
app.get('/api/quote/affirmation', (req, res) => {
    const affirmations = quotes.affirmations;
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    res.json(affirmations[randomIndex]);
  });
  

// Start the server
module.exports = app;