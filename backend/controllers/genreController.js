import Genre from '../models/genreModals.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: 'Name is required' });
        }

        const existingGenre = await Genre.findOne({ name });

        if (existingGenre) {
            return res.json({ error: 'Genre already exists' });
        }

        const genre = await new Genre({ name }).save();
        res.json(genre);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const genre = await Genre.findOne({ _id: id });

        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        genre.name = name;

        const updateGenre = await genre.save();
        res.json(updateGenre);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

const deleteGenre = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deleteGenre = await Genre.findOneAndDelete(id);
        if (!deleteGenre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        res.json(deleteGenre);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

const listGenres = asyncHandler(async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.json(genres);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

const readGenre = asyncHandler(async (req, res) => {
    try {
        const genre = await Genre.findById({_id: req.params.id})
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        res.json(genre);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

export {
    createGenre,
    updateGenre,
    deleteGenre,
    listGenres,
    readGenre,
};
