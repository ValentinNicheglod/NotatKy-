# NotatKy
<img src="https://user-images.githubusercontent.com/67331469/119239494-cba68400-bb1f-11eb-816e-68e1f6f746bc.png" width="100%"/>
Aplicación web de notas en donde puedes crear un perfil y guardar tus notas pudiendo también filtrarlas por etiquetas, agregarlas a colecciones y demás.


## 📋 Datos del proyecto...

✔️❌ **Estado:** Finalizado

📅⏰ **Fecha de comienzo y finalización:** 01/2021 - 03/2021

🔣⌨️ **Lenguajes utilizados:** Javascript

👨🏻‍💻 📋 **Tecnologías utilizadas:** BCrypt, Bootstrap, Express , Gulp, JWT, Material UI, Moment, Multer, MySQL, Nodemailer, Passport, **React**, Redux, Sequelize.

💻📱 **Tipo:** Página web



## 📎 Descripción del proyecto...
### Base de datos 
Base de datos gestionada en MySQL, utilizando Sequelize como ORM.

<p align="center">
  <img src="https://user-images.githubusercontent.com/67331469/119205591-043a5500-ba6f-11eb-9a1c-b9dd3c677d5d.png" width="70%" align="center"/>
</p>

### Backend
Backend programado en *NodeJS* y Express con deploy realizado en Heroku.
* La autenticación de los usuarios se realiza con Passport y JSONWebToken.
* La contraseña del usuario es encriptada mediante con bcrypt (mediante hash y salt).
* Detección de los cambios en modo invitado, reseteando a un modelo determinado cada vez que se inicia sesión.

### Frontend
Interfaz construida con *react* y estado administrado con *redux*.


#### Componentes

###### Collections
Lista las colecciones del usuario, permitiendole crear una colección nueva o editar las existentes.
###### EditNote
Componenete en donde se visualizan o editan las notas, se las asocia a colecciones o etiquetas, y demás acciones relacionadas.
###### Inicio
Página principal de la web, desde donde se puede iniciar sesión, registrarse o ingresar como invitado.
###### Loading
Spinner de carga.
###### Login
Componente que contiene el formulario de inicio de sesión.
###### NavBarHome
Barra de navegación principal que saluda al usuario dependiendo de la hora del día, contiene un campo de texto para buscar las notas y un botón de acceso a la configuración.
###### NoteCard
Cada nota es representada por una NoteCard que muestra su titulo, contenido, colección y ultima fecha de modificación.
###### Notes
Renderizará una `NoteCard` por cada nota separandolas por fecha de creación, en caso de que el usuario no tenga notas o la busqueda/filtros que ingreso no tenga resultados se mostrará un mensaje indicandolo.
###### NotFound
Pantalla de error 404.
###### Profile
Lista los datos personales, de contacto y contraseña del usuario, permitiendole modificarlos si lo desea.
###### ResetPassword
Se ingresá desde el formulario de inicio de sesión, en caso de que el usuario olvide su contraseña se le solicitará el correo electrónico y se le enviará un código para que logre reestablecerla.
###### SideBarHome
Barra lateral principal, que lista etiquetas y colecciones y brinda la opción de filtrar las notas que pertenezcan a dicha etiqueta o colección, también permite acceder a la papelera, las notas archivadas y la configuración solo en dispositivos móviles. 
###### SideBarSettings
Barra lateral de configuración, muestra datos del usuario y permite cambiar a modo oscuro, cerrar sesión y acceder a las colecciones y etiquetas. 
###### SignUp
Componente que contiene el formulario de registro, a medida que el usuario ingresa la información los campos de texto son validados.
###### Tags
Lista las etiquetas del usuario, permitiendole crear una etiqueta nueva o editar las existentes.
###### UserCard
Tarjeta de usuario, que muestra algunos de sus datos, cuando creo su cuenta y permite agregar, eliminar o cambiar la foto de perfil.


#### Contenedores
###### Home
Home contiene los componentes `SideBarHome`, `EditNote` y `Notes`, es la pantalla principal cuando se inicia sesión y se encargá de la mayoría de la lógica de la página.
###### SettingsCollections
SettingsCollections contiene los componentes `SideBarSettings`, `Collections` y `Tags`, se encargá de la lógica de colecciones y etiquetas.
###### SettingsProfile
SettingsProfile contiene los componentes `SideBarSettings`, `UserCard` y `Profile`, se encargá de la lógica de datos de usuario.



## 🖼️ Imágenes del proyecto...
> Inicio.
![inicio](https://user-images.githubusercontent.com/67331469/119207586-fee00900-ba74-11eb-8d4e-17886b05b1d7.jpg)


> Inicio de sesión.
![login](https://user-images.githubusercontent.com/67331469/119207585-fee00900-ba74-11eb-999b-0f352c42befb.jpg)


> Registrarse.
![signup](https://user-images.githubusercontent.com/67331469/119207581-fdaedc00-ba74-11eb-9238-826c45249196.jpg)

> Recuperar contraseña.
<p align="center">
  <img src="https://user-images.githubusercontent.com/67331469/119207576-fc7daf00-ba74-11eb-8ce2-bf3f617c342f.jpg" width="32%"/>
  <img src="https://user-images.githubusercontent.com/67331469/119207575-fc7daf00-ba74-11eb-9758-2102b23572ee.jpg" width="32%"/>
  <img src="https://user-images.githubusercontent.com/67331469/119207572-fbe51880-ba74-11eb-8790-f9bcbb7f7ecb.jpg" width="32%"/>
</p>

> Home.
![home](https://user-images.githubusercontent.com/67331469/119207568-fab3eb80-ba74-11eb-8908-8120c410570f.jpg)

> Edición.
![home-editing](https://user-images.githubusercontent.com/67331469/119207566-f982be80-ba74-11eb-9864-07534d26f12f.jpg)

> Añadir etiquetas.
![home-add-tag](https://user-images.githubusercontent.com/67331469/119207567-fa1b5500-ba74-11eb-8fbd-dfef55cbb09f.jpg)

> Perfil.
![profile](https://user-images.githubusercontent.com/67331469/119207583-fe477280-ba74-11eb-9b16-75ed74a54007.jpg)

> Colecciones y etiquetas.
![col-tag](https://user-images.githubusercontent.com/67331469/119207579-fd164580-ba74-11eb-87ac-8584b51759f1.jpg)
