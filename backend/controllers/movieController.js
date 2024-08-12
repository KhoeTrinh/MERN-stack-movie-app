import Movie from '../models/movieModals.js';

const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.json(savedMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSpecificMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res
                .status(404)
                .json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedMovie) {
            return res
                .status(404)
                .json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const movieReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const movie = await Movie.findByIdAndUpdate(req.params.id);

        if (movie) {
            const alreadyReviewed = movie.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Movie already reviewed');
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            movie.reviews.push(review);
            movie.numReviews = movie.reviews.length;
            movie.rating =
                movie.reviews.reduce(
                    (acc, item) => item.rating + acc,
                    0
                ) / movie.reviews.length;

            await movie.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404);
            throw new Error('Movie not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res
                .status(404)
                .json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { movieId, reviewId } = req.body;
        const movie = await Movie.findByIdAndUpdate(movieId);

        if (!movie) {
            return res
                .status(404)
                .json({ message: 'Movie not found' });
        }

        const reviewIndex = movie.reviews.findIndex(
            (r) => r._id.toString() === reviewId
        );

        if (reviewIndex === -1) {
            return res
                .status(404)
                .json({ message: 'Review not found' });
        }

        movie.reviews.splice(reviewIndex, 1);
        movie.numReviews = movie.reviews.length;
        movie.rating =
            numReviews > 0
                ? movie.reviews.reduce(
                      (acc, item) => item.rating + acc,
                      0
                  ) / movie.reviews.length
                : 0;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createMovie,
    getAllMovies,
    getSpecificMovie,
    updateMovie,
    movieReview,
    deleteMovie,
    deleteComment,
};
