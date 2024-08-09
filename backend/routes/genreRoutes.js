import express from 'express';
const router = express.Router();

// Controllers
import {
    createGenre,
    updateGenre,
    deleteGenre,
    listGenres,
    readGenre,
} from '../controllers/genreController.js';

// Middlewares
import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authMiddleware.js';

router.route('/').post(authenticate, authorizeAdmin, createGenre);
router
    .route('/:id')
    .get(readGenre)
    .put(authenticate, authorizeAdmin, updateGenre)
    .delete(authenticate, authorizeAdmin, deleteGenre);
router.route('/genres').get(listGenres);

export default router;
