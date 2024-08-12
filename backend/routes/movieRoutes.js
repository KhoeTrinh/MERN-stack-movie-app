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
    .route('/delete-comment/:id')
    .delete(authenticate, authorizeAdmin, deleteComment);
export default router;
