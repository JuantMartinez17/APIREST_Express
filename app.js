const express = require('express');
const app = express();
app.disable('x-powered-by');
const movies = require('./movies.json');

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.json(movie)
  }
  res.status(404).json({ message: '404 Movie not found' })
})

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})