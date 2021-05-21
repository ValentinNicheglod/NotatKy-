let express = require('express');
let server = express.Router();
const { Note, Tag } = require('../database/index.js');

//Devuelve una etiqueta | Returns a tag
server.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
		const result = await Tag.findByPk(id);
		if (!result) {
            res.status(404).send('La etiqueta no existe');
        } else {
            return res.status(201).json(result);
        }
	} catch (error) {
		return next(error);
	}
});

//Devuelve las etiquetas de un usuario | Returns the tags of an user
server.get('/all/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
		const result = await Tag.findAll({
            where: { userId }
        });
        return res.status(201).json(result);
	} catch (error) {
		return next(error);
	}
});

//Crea una etiqueta | Creates a tag
server.post('/:userId', (req, res, next) => {
    const { userId } = req.params;
    const { name, color } = req.body.data;
    try {
        if (!name) {
            res.status(404).send("Nombre no proporcionado")
        } else {
            Tag.create(
                {
                    userId,
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    color: color || '#F2F7F2'
                }
            )
            .then(async (tag) => {
                const tags = await Tag.findAll({
                    where: { userId }
                });
                return res.status(201).json({
                    message: 'Etiqueta creada',
                    tag,
                    tags,
                });
            })
        }
	} catch (error) {
		return next(error);
	}
});

//Agrega un tag a una nota | Add tag to a note
server.post('/:noteId/:tagId', async (req, res, next) => {
    const { noteId, tagId } = req.params;
    try {
        const note = await Note.findByPk(noteId, {
            include: [Tag]
        })
        const tag = await Tag.findByPk(tagId)
        await note.addTags(tag) 
        const updatedNote = await Note.findByPk(noteId, {
            include: [Tag]
        }) 
        return res.status(201).json(updatedNote);
	} catch (error) { 
		return next(error);
	} 
});

//Elimina un tag de una nota | Deletes tag of a note
server.delete('/:noteId/:tagId', async (req, res, next) => {
    const { noteId, tagId } = req.params;
    try {
        const note = await Note.findByPk(noteId, {
            include: [Tag]
        }) 
        const tag = await Tag.findByPk(tagId)
        await note.removeTag(tag)
        const updatedNote = await Note.findByPk(noteId, {
            include: [Tag]
        }) 
        return res.status(201).json(updatedNote);
	} catch (error) {
		return next(error); 
	}
});

//Modifica una etiqueta | Updates a tag
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, color, userId } = req.body.data;
    try {
		Tag.update(
            {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                color
            },
            { where: { id } }
        )
        .then(async () => {
            const tag = await Tag.findByPk(id);
            const tags = await Tag.findAll({
                where: { userId }
            });
            return res.status(201).json({
                message: 'Etiqueta actualizada',
                tags,
                tag
            });
		})
	} catch (error) {
		return next(error);
	}
});

//Elimina una etiqueta | Deletes a tag
server.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const tag = await Tag.findByPk(id);
        const userId = tag.userId;
		Tag.destroy(
            { where: { id } }
        )
        .then(async () => {
            const tags = await Tag.findAll({
                where: { userId }
            });
            return res.status(201).json({
                message: 'Etiqueta eliminada',
                tags
            });
		})
	} catch (error) {
		return next(error);
	}
});

module.exports = server;