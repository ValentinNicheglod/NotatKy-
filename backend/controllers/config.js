const nodemailer = require('nodemailer');

const hbs = require('nodemailer-handlebars');

/* const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'treehenrybank@gmail.com' ,
    pass: 'epA6ugrj4pfyCpu', 
    clientId: '461410365933-dnta1kqb2r49249ibmtl6oosfn997j8l.apps.googleusercontent.com',
    clientSecret: 'jhd3cCHUMbKlV9rRBKO4HYbX',
    refreshToken: '1//04YRhD05QZ8FqCgYIARAAGAQSNwF-L9IrLNiKhTtZyCHmp0QHMA60f-K3B8zuoshP1vzQ9WlrgI2JMmDLdZKTP5lDzwUWuuJV6nU',
    
  }
}); */

const path = 'public/templates/'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    //host: "smtp.gmail.com",
    //port: 465,
    //secure: true, // true for 465, false for other ports
    auth: {
      user: 'notatkyapp@gmail.com', // generated ethereal user
      pass: 'iwljbvkgpoprezif', // generated ethereal password
    },
  });

  /* transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: path.toString()
  })) */

/* try {
  const user = await User.findOne({where: {email}});
  const result = await Validation.create({validationNumber, userId: user.id});
  res.status(201).json(result);
} catch (error) {
  next(error);
} */


/* transporter.sendMail(mailOptions, function(err, data) {
  if(err) {
    console.log('Error', err)
  } else {
    console.log('Email sent !')
  }
}) */ 

module.exports = transporter;