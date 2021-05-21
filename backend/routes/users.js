const express = require('express');
const multer = require('multer');
const transporter = require('../controllers/config.js');
const server = express.Router();
const { User } = require('../database/index.js');
//const handlebars = require('handlebars');
//const { promisify } = require('util');
const fs = require('fs-extra');

//const readFile = promisify(fs.readFile);

const date = new Date;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        !file
        ? console.log('No se selecciono un archivo')
        : cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
const upload = multer({ 
    storage: storage 
})

//Devuelve todos los usuarios | Returns all users
server.get('/', (req, res) => {
    return User.findAll()
    .then(users => res.status(201).send(users))
});

server.get('/mails', (req, res) => {
    return User.findAll({
        attributes: ['email']
    })
    .then(users => res.status(201).send(users))
});

//Devuelve un usuario | Returns a user
server.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    try {
		if (!user) {
            res.status(404).send('El usuario no existe');
        } else {
            
            return res.json(user);
        }
	} catch (error) {
		return next(error);
	}
});

//Modifica los datos de un usuario | Updates user data
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { 
        email, 
        name, 
        lastname, 
        ocupation, 
        gender, 
        phone,
    } = req.body.data;
    try {
		User.update(
            {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
                ocupation: ocupation.charAt(0).toUpperCase() + ocupation.slice(1),
                gender,
                email,
                phone
            },
            { where: { id } }
        )
        .then(async () => {
            const user = await User.findByPk(id);
			res.json(user);
		})
	} catch (error) {
		return next(error);
	}
});

//Modifica la contraseña de un usuario | Updates user password
server.put('/password/:id', (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body.data;
    try {
		User.update(
            {
                password
            },
            { where: { id } }
        )
        .then(async () => {
            const user = await User.findByPk(id);
			res.json(user);
		})
	} catch (error) {
		return next(error);
	}
});

//Modifica la contraseña de un usuario | Updates the password of an user
server.post('/reset-password/:email', async (req, res, next) => {
    const { email } = req.params;
    const code = Math.random().toString().slice(2,8); //Código de seis digitos | Six digit code
    const user = await User.findOne({
        where: { email }
    })
    try {
        if (!user){
            return res.json({
                message: "El correo electrónico ingresado no pertenence a ninguna cuenta",
                code: null
            })
        } else {
            await transporter.sendMail({
                from: '"NotatKy" <notatkyapp@gmail.com>',
                to: email,
                subject: "Reestablece tu contraseña",
                html: `
                    <div>
                        <div style="width: 100%; height: 100%;">
                            <div style="width: 100%">
                                <p>Hola ${user.name}, hemos recibido tu solicitud para reestablecer tu contraseña.</p>
                                <p>Ingresa el siguiente código en la pagina web y cambiala.</p>
                            </div>
                            <div className="width: 100%;">
                                <div style="width: 100%; display: flex; justify-content: center;">
                                    <div style="
                                    width: fit-content;
                                    padding-left: 20px;
                                    padding-right: 20px;
                                    height: fit-content;
                                    background-color: lightgray;
                                    border-radius: 20px;
                                    font-weight: 300;
                                    margin-bottom: 20px;
                                    text-align: center;
                                    ">
                                        <h3 style="text-align: center;">CÓDIGO DE VERIFICACIÓN</h3>
                                        <h1 style="letter-spacing: 10px; text-align: center;">${code}</h1>
                                    </div>
                                </div>
                            </div>
                            <div/>
                            <hr />
                            <footer>
                                <div style="width: 100%;">
                                    <p style="text-align: center;">
                                        <small>Si no has solicitado cambiar tu contraseña ignora este correo.</small>
                                    </p>
                                    <p style="text-align: center;">
                                        <small>NotatKy | ${date.getFullYear()}</small>
                                    </p>
                                </div>
                            </footer>
                        </div>
                    </div>`
            }, (err) => {
                if (err) {
                    return console.log(err);
                }
                return res.status(201).json({
                    code,
                    message: "Correo electrónico enviado",
                    user
                })
            })
        }
	} catch (error) {
		return next(error);
	}
});

//Codifica y sube foto de perfil a base de datos | Encode and uploads profile photo to database
server.post('/uploadphoto/:id', upload.single('picture'), (req, res, next) => {
    const img = req.file && fs.readFileSync(req.file.path);
    const encode_image = req.file && img.toString('base64'); //Codificación | Encoding (base64)
    const id = req.params.id;

    const finalImg = {
        contentType: req.file.mimetype,
        image: encode_image
    };
    
    try {
		User.update(
            {
                profile_photo: finalImg
            },
            { where: { id } }
        )
         .then(() => {
            res.redirect('https://valentinnicheglod.github.io/NotatKy/#/edit%20profile')
		})
	} catch (error) {
		return next(error);
	}
});

//Elimina un usuario | Deletes a user
server.delete('/delete/:id', (req, res, next) => { 
    const { id } = req.params;
    try {
		User.destroy(
            { where: { id } }
        )
        .then(() => {
            return res.status(201).send("Usuario eliminado");
        })
	} catch (error) {
		return next(error);
	}
});

module.exports = server;
