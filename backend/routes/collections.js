let express = require('express');
let server = express.Router();
const { Collection, Note, Tag } = require('../database/index.js');

//Devuelve una colección | Returns a collection
server.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
		const result = await Collection.findByPk(id);
		if (!result) {
            res.status(404).send('La colección no existe');
        } else {
            return res.status(201).json(result);
        }
	} catch (error) {
		return next(error);
	}
});

//Devuelve las colecciones de un usuario | Returns the collections of one user
server.get('/all/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
		const result = await Collection.findAll({
            where: { userId }
        });
        return res.status(201).json(result);
	} catch (error) {
		return next(error);
	}
});

//Crea una colección | Creates a collection
server.post('/:userId', (req, res, next) => {
    const { userId } = req.params;
    const { name, description } = req.body.data;
    try {
        if (!name) {
            res.status(404).send("Nombre no proporcionado")
        } else {
            Collection.create(
                {
                    userId,
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    description: description.charAt(0).toUpperCase() + description.slice(1)
                }
            )
            .then(async (collection) => {
                const collections = await Collection.findAll({
                    where: { userId }
                });
                return res.status(201).json({
                    collection,
                    collections,
                    message: 'Colección creada'
                });
            })
        }
	} catch (error) {
		return next(error);
	}
});

//Agrega o modifica una coleccion a una nota | Adds or updates a collection to a note
server.post('/:noteId/:collectionId', async (req, res, next) => {
    const { noteId, collectionId } = req.params;
    try {
        await Note.update({
            collectionId
        }, {
            where: {id: noteId}
        })
        const updatedNote = await Note.findByPk(noteId, {
            include: [Tag]
        }) 
        return res.status(201).json(updatedNote);
	} catch (error) { 
		return next(error);
	} 
});

//Modifica una colección | Updates a collection
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description, userId } = req.body.data;
    try {
		Collection.update(
            {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                description: description.charAt(0).toUpperCase() + description.slice(1)
            },
            { where: { id } }
        )
        .then(async () => {
            const collection = await Collection.findByPk(id)
            const collections = await Collection.findAll({
                where: { userId }
            });
            return res.status(201).json({
                collection,
                collections,
                message: 'Colección actualizada'
            });
		})
	} catch (error) {
		return next(error);
	}
});

//Elimina una colección | Deletes a collection
server.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const collection = await Collection.findByPk(id);
        const userId = collection.userId;
		Collection.destroy(
            { where: { id } }
        )
        .then(async () => {
            const collections = await Collection.findAll({
                where: { userId }
            });
            return res.status(201).json({
                collections,
                message: 'Colección eliminada'
            });
		})
	} catch (error) {
		return next(error);
	}
});

module.exports = server;