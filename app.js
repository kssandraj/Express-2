require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js");

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);

/*------------- USER PART ---------------*/

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post("/api/users", validateUser, usersHandlers.postUser);

app.put("/api/users/:id", validateUser, usersHandlers.updateUser);

app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
