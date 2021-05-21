let express = require('express');
let server = express.Router();
const { Note, Tag } = require('../database/index.js');

//Devuelve una nota | Returns a note
server.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
		const note = await Note.findByPk(id, {
            include: [Tag]
        });
		if (!note) {
            res.status(404).send('La nota no existe');
        } else {
            return res.status(201).json(note);
        };
	} catch (error) {
		return next(error);
	}
});

//Devuelve las notas de un usuario | Returns the notes of an user
server.get('/all/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
		const notes = await Note.findAll({
            where: { userId },
            include: [{
                model: Tag
            }]
        });
        return res.status(201).json(notes);
	} catch (error) {
		return next(error);
	}
});

//Crea una nota | Creates a note
server.post('/:userId', (req, res, next) => {
    const { userId } = req.params;
    const { title, content, collectionId, id} = req.body.data;
    try {
		Note.create( 
            {
                userId,
                title,
                content,
                state: "main-dashboard",
                collectionId,
            }
        )
        .then(async (note) => {
            if (id) { //En caso de que sea nota duplicada | If note is a duplicate
                const originalNote = await Note.findByPk(id, {
                    include: [Tag]
                })
                await note.addTags(originalNote.tags) // Se agregan tags a la nueva nota
                const duplicatedNote = await Note.findByPk(note.id, {
                    include: [Tag]
                });
                const notes = await Note.findAll({
                    where: { userId },
                    include: [{
                        model: Tag
                    }]
                });
                return res.status(201).json({
                    message: 'Nota duplicada',
                    note: duplicatedNote,
                    notes
                });
            }
            const notes = await Note.findAll({
                where: { userId },
                include: [{
                    model: Tag
                }]
            });
            return res.status(201).json({
                message: 'Nota creada',
                note,
                notes
            });
		})
	} catch (error) {
		return next(error);
	}
});

//Modifica una nota | Updates a note
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {collectionId, title, content, state, userId } = req.body.data;
    try {
		Note.update(
            {
                title,
                content,
                state,
                collectionId
            },
            { where: { id } }
        )
        .then(async () => {
			const note = await Note.findByPk(id, {
                include: [Tag]
            })
            const notes = await Note.findAll({
                where: { userId },
                include: [{
                    model: Tag
                }]
            });
            return res.status(201).json({
                message: 'Nota actualizada',
                note,
                notes
            });
		})
	} catch (error) {
		return next(error);
	}
});

//Modifica el estado de una nota | Updates the state of a note
server.put('/state/:noteId', (req, res, next) => {
    const { noteId } = req.params;
    const { state, userId } = req.body.data
    try {
		Note.update(
            {
                state
            },
            { where: { id: noteId } }
        )
        .then(async () => {
            const updatedNotes = await Note.findAll({
                where: { userId },
                include: [{
                    model: Tag
                }]
            });
            return res.status(201).json(updatedNotes);
        })
	} catch (error) {
		return next(error);
	}
});

//Elimina una nota | Deletes a note
server.delete('/:noteId/:userId', (req, res, next) => { 
    const { noteId, userId } = req.params;
    try {
		Note.destroy(
            { where: { id: noteId } }
        )
        .then(async () => {
            const notes = await Note.findAll({
                where: { userId },
                include: [{
                    model: Tag
                }]
            });
            return res.status(201).json({
                message: 'Nota eliminada',
                notes
            });
        })
	} catch (error) {
		return next(error);
	}
});

module.exports = server;