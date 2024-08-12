import express from 'express';
const router = express.Router();

// Controllers
import {
    createMovie,
    getAllMovies,
    getSpecificMovie,
    updateMovie,
    movieReview,
    deleteMovie,
    deleteComment,
    getNewMovies,
    getTopMovies,
    getRandomMovies,
} from '../controllers/movieController.js';

// Middlewares
import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

// Public Routes
router.route('/all-movies').get(getAllMovies);
router.route('/specific-movie/:id').get(getSpecificMovie);
router.route('/new-movies').get(getNewMovies);
router.route('/top-movies').get(getTopMovies);
router.route('/random-movies').get(getRandomMovies);

// Restrictec Routes
router.route('/:id/reviews').post(authenticate, checkId, movieReview);

// Admin
router
    .route('/create-movie')
    .post(authenticate, authorizeAdmin, createMovie);
router
    .route('/update-movie/:id')
    .put(authenticate, authorizeAdmin, updateMovie);
router
    .route('/delete-movie/:id')
    .delete(authenticate, authorizeAdmin, deleteMovie);
router
    .route('/delete-comment')
    .delete(authenticate, authorizeAdmin, deleteComment);
export default router;
