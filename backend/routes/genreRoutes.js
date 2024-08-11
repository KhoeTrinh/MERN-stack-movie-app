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
router.route('/genres').get(listGenres);
router
    .route('/:id')
    .put(authenticate, authorizeAdmin, updateGenre)
    .delete(authenticate, authorizeAdmin, deleteGenre)
    .get(readGenre);

export default router;
