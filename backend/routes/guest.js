let express = require('express');
require("dotenv").config();
let server = express.Router();
const { Collection, Note, Tag, User } = require('../database/index.js');
const id = 1;

const collections = [
    {
        id: 1,
        name: 'Programación',
        description: 'Curso de programación',
        userId: id,
    },
    {
        id: 2,
        name: 'Recetas', 
        description: '',
        userId: id,
    },
    {
        id: 3,
        name: 'Conceptos', 
        description: '',
        userId: id,
    },
    {
        id: 4,
        name: 'Universidad',
        description: '',
        userId: id,
    }
];

const notes = [
    {
        title: 'Lasaña',
        content: `INGRDIENTES...
        • 300 mililitros de Salsa bechamel
        • 12 láminas de Pasta para lasaña
        • 1 kilogramo de Carne picada (mitad cerdo y mitad ternera)
        • 1 unidad de Cebolla
        • 2 dientes de Ajo
        • 400 gramos de Tomate triturado
        • 100 gramos de Tomate frito (unas 5 o 6 cucharadas)
        • 5 cucharadas soperas de Aceite de oliva (unos 50 ml)
        • 50 gramos de Queso rallado
        • 1 trozo de Mantequilla para untar en la fuente
        • 2 litros de Agua
        • 1 pizca de Sal y Pimienta negra molida
        PREPARACIÓN...
        1. Empieza por picar la cebolla y el ajo finamente, entonces, en una sartén con aceite caliente a fuego medio, haz un sofrito con estos dos ingredientes. Sofríe hasta que empiece a ponerse todo transparente, si vez que la cebolla o el ajo empiezan a dorarse añade un poco de agua y revuelve bien.
        2. A continuación añade la carne a la sartén y revuelve bien de manera que se cocine toda la carne por igual. El tiempo de cocción será de unos 20-30 minutos.
        3. Pasado este tiempo, incorpora el tomate triturado, el tomate frito y sazona con una pizca de de sal y pimienta. Mezcla bien y sube la llama a fuego alto para cocinar el conjunto por unos 5 minutos más, la idea es que se concentre el tomate.
        4. Cuando veas que la carne está en su punto, prueba la sazón y corrige si es necesario. Reserva la carne para el relleno de la lasaña aparte.
        5. Con la carne ya lista, puedes ponerte a cocinar las láminas de pasta. Para ello, calienta suficiente agua con una pizca de sal y sigue las instrucciones del fabricante, por lo general con unos 8 minutos de cocción es suficiente.
        Si quieres ahorrarte este paso puedes conseguir láminas para lasaña precocidas.
        6. Para montar la lasaña de carne, engrasa una fuente para horno con mantequilla y empieza colocando una capa de pasta en la base. Luego coloca una capa del relleno de carne y termina con una porción de salsa bechamel.
        Si quieres hacer esta salsa blanca de forma casera aquí tienes la receta de salsa bechamel para lasaña.
        7. Repite el procedimiento hasta terminar con los ingredientes, el resultado debería ser de unas tres capas de pasta y carne. Termina la lasaña con una capa de pasta, encima bechamel y por último una capa gruesa de queso.
        8. Cocina la lasaña casera en el horno a 180ºC y con el grill puesto hasta que el queso gratine. Una vez lista, retira del horno y deja reposar unos 10 minutos para que al cortar las porciones no se desarme la lasaña.`,
        userId: id,
        collectionId: 2,
        tags: [4]
    },
    {
        title: 'Javascript',
        content: 'JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, ​basado en prototipos, imperativo, débilmente tipado y dinámico.',
        userId: id,
        collectionId: 1,
        tags: [],
    },
    {
        title: 'Acciones',
        content: 'Las acciones son un bloque de información que envia datos desde tu aplicación a tu store. Son la única fuente de información para el store.',
        userId: id,
        collectionId: 1,
        tags: [6],
    },
    {
        title: 'Reducers',
        content: 'Los reducers son funciones puras que toman el estado anterior y una acción, y devuelven un nuevo estado. Recuerda devolver un nuevo objeto de estado en vez de modificar el anterior. Puedes empezar con un único reducer, y mientras tu aplicación crece, dividirlo en varios reducers pequeños que manejan partes específicas del árbol de estado. Ya que los reducers son funciones puras, puedes controlar el orden en que se ejecutan, pasarle datos adicionales, o incluso hacer reducers reusables para tareas comunes como paginación.',
        userId: id,
        collectionId: 1,
        tags: [6],
    },
    {
        title: 'Marquesa de oro',
        content: `INGREDIENTES...
        • 60 galletas Oreo
        • 800 mililitros de leche (3⅓ tazas)
        • 60 gramos de maicena
        • 1 cucharada sopera de vainilla
        • 2 cucharadas soperas de azúcar
        PREPARACIÓN...
        1. Para preparar la crema de la marquesa de Oreo, separa la cremita de todas las galletas. Ten cuidado para que no se rompan y puedas armarla más bonita.
        2. De los 800 ml de leche separa un vaso y calienta el resto junto con la cremita de las galletas y la vainilla.
        3. Mientras la leche toma calor, une la maicena con la leche que reservaste.
        4. Cuando la leche esté a punto de hervir, vierte la taza con la maicena y revuelve constantemente para evitar que se pegue. Apaga cuando espese. Te recomendamos que pruebes el punto de dulce de la crema. Debería ser suficiente con el azúcar de la cremita, pero si lo quieres más dulce, añade las dos cucharadas de azúcar
        5. Con la crema aún caliente, procede a armar la marquesa. Nosotros usamos un molde desmontable de 20 cm de diámetro por 4 de alto. Simplemente, extiende un poco de la crema en el fondo.
        6. Ahora, coloca las galletas para cubrir el fondo del molde. Lo que debes hacer es alternar las capas de crema y galletas hasta llegar al borde del molde.
        7. Finaliza con una capa de galletas. Colócalas bonitas para que tu postre se vea más vistoso. También puedes romper unas galletas para adornar tu marquesa de Oreo y adornar con rosas de crema batida en el borde. Enfría por cuatro horas como mínimo. Sirve la marquesa inmediatamente al sacarla del refrigerador.`,
        userId: id,
        collectionId: 2,
        tags: [1],
    },
    {
        title: 'Pancakes de avena',
        content: `INGREDIENTES...
        • 250 gramos de copos de avena
        • 200 mililitros de leche
        • 1 unidad de huevo
        • 1 cucharadita de edulcorante
        • 40 gramos de mantequilla
        • 1 pizca de canela en polvo
        • 1 cucharada postre de esencia de vainilla
        PREPARACIÓN...
        1. Antes de realizar estos pancakes de avena deliciosos, el primer paso es alistar todos los ingredientes.
        2. En un procesador, añade la avena en hojuelas y tritura unos minutos hasta obtener una harina de avena.
        3. En un bol, mezcla la avena, el huevo y la leche. Bate todos los ingredientes hasta obtener una mezcla homogénea.
        4. Agrega la esencia de vainilla, la canela en polvo al gusto y el sobre de splenda (edulcorante). Mezcla muy bien y, si consideras que la masa de los pancakes de avena queda demasiado espesa, puedes añadir un poco más de leche, siempre en pequeñas cantidades para no excederte.
        5.En una sartén a fuego bajo, añade unos 10 g de mantequilla y un poco de la mezcla de pancakes. Cocina las tortitas de avena durante 3 minutos por cada lado y repite este mismo procedimiento con el resto de la mezcla.
        Truco: No uses el fuego muy alto o tus panqueques podrían quedar crudos.
        6. Sirve los pancakes de avena uno sobre otro, báñalos con un poco de sirope, miel o caramelo, cubre con almendra fileteada y fresas deshidratadas (opcional). Este plato es un excelente desayuno, con un gran porcentaje de fibra, que puede tomarse acompañado de un sándwich con huevo, huevos revueltos o una taza de café moka.`,
        userId: id,
        collectionId: 2,
        tags: [2]
    },

    {
        title: 'Ensalada Cesar',
        content: `INGRDIENTES...
        • 200 gramos de Lechuga romana
        • 1 unidad de Huevo
        • 1 diente de Ajo
        • 120 mililitros de Aceite de oliva
        • 30 gramos de Anchoa
        • 30 gramos de Queso parmesano
        • 1 unidad de Limón
        • 30 gramos de Crutons de pan o Picatostes
        • 1 pizca de Sal y Pimienta
        PREPARACIÓN...
        1. Alistar todos los ingredientes.
        2. Para hacer la salsa césar, en la licuadora agregar el huevo, el diente de ajo, el jugo del limón, 4 filetes de anchoas, un poco del aceite de éstas y del aceite de oliva, una pizca de sal y pimienta. Licuar durante 30 segundos.
        3. Agregar el aceite de oliva poco a poco en forma de hilo con la licuadora encendida, hasta obtener consistencia de mayonesa.
        4. En un tazón grande agregar la lechuga cortada en trozos y la mayonesa; revolver hasta lograr que las lechugas estén cubiertas totalmente.
        5. Servir la lechuga junto con los crutones de pan, queso parmesano y un par de anchoas. Si se desea agregar más salsa. La ensalada césar tradicional es la base para otras ensaladas como la ensalada césar con pollo o con camarones.`,
        userId: id,
        collectionId: 2,
        tags: [4]
    },
    {
        title: 'Canelones de verano',
        content: `INGRDIENTES...
        • 16 placas de canelones
        • 3 latas de atún en aceite o al natural
        • 4 huevos
        • 1 cebolla tierna
        • 100 gramos de tomate frito
        • 1 bote de aceitunas
        • 1 bote de mayonesa
        PREPARACIÓN...
        1. Vierte abundante agua en un cazo y añade un poco de sal. Cuando empiece a hervir, añade las placas de canelones una a una, déjalas cocer unos 10 minutos o lo que indique el fabricante.
        2. Cuando estén cocidas las placas, échalas en un escurridor para que suelten todo el agua. Pon un paño de cocina limpio sobre una base y coloca las placas de canelones estiradas para dejarlas enfriar.
        3. Pon los huevos a cocer, para que queden duros tenlos unos 10-12 minutos cociendo, saca y deja enfriar.
        4. Coge un bol y echa en él el atún escurrido. Pica los huevos y agrégalos al bol. Deja 2 o 3 yemas de huevo aparte para adornar.
        5. Pica la cebolla en pedacitos muy pequeños, añádela también al bol. Incorpora el tomate frito poco a poco, ve removiendo y termina de añadirlo al gusto.
        6. Con una cuchara ve poniendo porciones de relleno en cada placa de estos canelones fríos.
        7. Ve enrollando los canelones rellenos y poniéndolos en una bandeja de servir.
        8. Cubre la superficie de los canelones de verano con una capa de mayonesa. Espolvorea las yemas reservadas por encima y adorna con unas aceitunas. Puedes acompañar los canelones de verano con un poco de lechuga alrededor y ¡listo!`,
        userId: id,
        collectionId: 2,
        tags: [4]
    },
    {
        title: 'Pizza de avena',
        content: `INGRDIENTES...
        • 600 gramos de avena en copos u hojuelas
        • 1 taza de agua caliente
        • 1 cucharada sopera de queso parmesano (opcional)
        • 1 pizca de sal
        • 1 cucharadita de levadura
        • 1 cucharada sopera de aceite de oliva
        • 300 gramos de tomate triturado
        • 1 cucharada sopera de sazonador de hierbas italianas
        • ½ taza de champiñones
        • ½ taza de elote en grano (maíz)
        • 1 pimiento rojo
        • 1 pimiento verde
        • 1 taza de queso mozzarella rallado
        PREPARACIÓN...
        1. Para preparar tu pizza de avena, primero tritura las hojuelas de avena en la licuadora o en un procesador de alimentos. Tritura hasta que tenga una textura similar a la de la harina.
        2. Vacía la harina de avena en un recipiente, agrega una pizca de sal y una cucharada de queso parmesano y mezcla para que se integren bien.
        Truco: el queso parmesano le dará un toque de sabor a la masa de pizza de avena, pero puedes no usarlo.
        3. Disuelve la levadura en una taza de agua caliente, después agrégala al recipiente de la harina, mezcla y comienza a amasar hasta obtener una textura manejable.
        4. Cuando logres una textura de masa, añade una cucharada de aceite de oliva y vuelve a amasar.
        5. Precalienta tu horno a 200 °C por 10 minutos y extiende tu masa en un molde para pizza, asegúrate de que quede de un grosor uniforme. Después, precocina la masa en el horno por 10 minutos.
        Truco: también puedes hacer la pizza de avena en sartén.
        6. Mientras se precocina tu base de pizza de avena, prepara la salsa de tomate mezclando el tomate triturado con una cucharada de hierbas italianas.
        Truco: si no tienes sazonador de hierbas italianas, puedes agregar un poco de orégano, mejorana y tomillo.
        7. Prepara todos los ingredientes para hacer tu pizza de avena. Puedes escoger los que más te gusten, pero si decides seguir nuestra recomendación, rebana el champiñón y corta los pimientos en juliana.
        8. Pasado el tiempo de precocción, saca la base del horno y comienza a añadirle los ingredientes. Primero, agrega la salsa de tomate, después un poco de queso, los vegetales o los ingredientes que elijas.
        9. Sube la temperatura del horno a 250 °C y termina de hornear la pizza de avena por 15 minutos.`,
        userId: id,
        collectionId: 2,
        tags: [4]
    },
    {
        title: 'Álgebra elemental',
        content: `El álgebra elemental, desarrolla todos los conceptos básicos del álgebra. 
        De acuerdo con este punto, se puede observar una diferencia con la aritmética (no usa letras). 
        Por ejemplo: 3x+5 = 14. El valor que en este caso satisface la incógnita, es 3, dicho valor se conoce como solución o raíz.`,
        userId: id,
        collectionId: 3,
        tags: [6]
    },
    {
        title: 'Álgebra Booleana',
        content: `El álgebra booleana es aquella utilizada en el lenguaje del sistema binario (en programación) para representar dos estados o valores ya sea este (1) o (0) que indica si un dispositivo se encuentra abierto o cerrado, si está abierto es porque conduce, de lo contrario (cerrado) es porque no conduce.`,
        userId: id,
        collectionId: 3,
        tags: []
    },
    {
        title: 'Renderizado condicional',
        content: `El renderizado condicional en React funciona de la misma forma que lo hacen las condiciones en JavaScript. Usa operadores de JavaScript como if o el operador condicional para crear elementos representando el estado actual, y deja que React actualice la interfaz de usuario para emparejarlos.`,
        userId: id,
        collectionId: 1,
        tags: [5]
    },
    {
        title: 'Tareas para el fin de semana',
        content: `
        • Limpiar baño
        • Pintar cuarto
        • Limpiar patio`,
        userId: id,
        collectionId: null,
        tags: [2]
    },
    {
        title: 'Pastel de chocolate',
        content: `INGREDIENTES...
        Para el bizcocho:
        • 200 gramos de Chocolate para postres
        • 175 gramos de Mantequilla
        • 175 gramos de Azúcar
        • 4 Huevos
        • 100 gramos de harina
        • 1 cucharada sopera de polvo de hornear
        Para el sirope:
        • 75 mililitros de Café largo hecho en casa
        • 100 gramos de Azúcar (½ taza)
        Para la decoración:
        • 100 mililitros de Nata líquida o crema de leche
        • 150 gramos de Chocolate para postres troceado
        • 4 cucharadas soperas de Caramelo líquido
        PREPARACIÓN...
        1. Para hacer nuestro pastel húmedo de chocolate, primero debemos trocear el chocolate para hacer el bizcocho y derretir poco a poco en el microondas, mientras vamos removiendo cada vez que lo saquemos. Reservamos.
        2. Precalentamos el horno a 180 ºC. En un bol, ponemos la mantequilla en trozos y reblandecida (la podéis meter unos segundos en el microondas para ello), junto con el azúcar y batimos todo con ayuda de unas varillas eléctricas.
        3. Incorporamos los huevos uno a uno y batimos después de cada adición para continuar con la preparación del pastel de chocolate húmedo y esponjoso.
        4. Añadimos el chocolate fundido que teníamos reservado y seguimos batiendo con la batidora o varillas eléctricas.
        5. Mezclamos los polvos de hornear junto con la harina y tamizamos encima de la masa del pastel de chocolate. Esta vez, mezclamos con una espátula suavemente pero integrando bien la harina.
        6. Engrasamos bien un molde de plum cake de unos 26 cm de largo y vertemos la masa del pastel húmedo de chocolate en él. Nivelamos la superficie y horneamos el bizcocho a 180 ºC (170 ºC con aire) durante 40 minutos, o hasta que al pinchar un palillo en el interior, este salga libre de masa.
        7. Mientras se hornea el pastel de chocolate, haremos el sirope de la siguiente manera: calentar el café largo en el microondas, sacar e incorporar el azúcar. Mezclamos bien y dejamos que se enfríe.
        8. Dejamos enfriar el bizcocho dentro del molde de 5 a 10 minutos antes de desmoldar. Lo ponemos encima de una rejilla con una bandeja debajo una vez desmoldado. Pinchamos la superficie del pastel con una brocheta, sobre todo por los bordes del pastel, pues siempre se queda esa zona más reseca, y vamos rociando poco a poco el pastel con el sirope de café. No añadimos más líquido hasta que no se haya filtrado todo en el interior del bizcocho. Así hasta que terminemos todo el sirope.
        9. Por último, haremos una salsa para decorar el pastel de chocolate húmedo y esponjoso. Para ello, hervimos la nata líquida en el microondas, sacamos y añadimos el chocolate troceado. Removemos bien hasta que el chocolate se haya fundido del todo.
        10. Incorporamos las cuatro cucharadas de caramelo líquido y mezclamos bien.
        11.Con una cucharilla, vamos rociando esta salsa por encima del bizcocho de chocolate.
        12.Decoramos con trocitos de chocolate picado y servir este espectacular pastel húmedo de chocolate.`,
        userId: id,
        collectionId: 2,
        tags: [1]
    },
    {
        title: 'Pastel de uvas',
        content: `INGRDIENTES...
        Masa quebrada:
        • 300 gramos de Harina
        • 75 gramos de Azúcar
        • 200 gramos de Mantequilla
        • 1 Huevo
        Relleno:
        • 500 gramos de Uvas
        • 150 gramos de Azúcar (¾ taza)
        • 100 gramos de Harina
        • 3 Huevos
        • 250 mililitros de Leche
        • 75 mililitros de Nata líquida o Crema de leche
        PREPARACIÓN...
        1. Para preparar nuestro pastel de uvas, primero haremos la masa quebrada casera.
        Para ello, pondremos en un bol amplio, la harina, el huevo, el azúcar y la mantequilla fría cortada en trocitos. Amasar con las manos hasta que esté todo integrado.
        Truco: Podemos utilizar una masa quebrada de las que venden hechas si no disponemos de mucho tiempo para hacer el pastel.
        2. Formar una bola con la masa, envolver en papel film y reservar en la nevera 30 minutos.
        3. Pasado este tiempo, debemos engrasar muy bien un molde de plum cake de 25 cm de largo, con capacidad para algo más de un litro.
        Sacar nuestra masa quebrada de la nevera, estirar con ayuda de un rodillo en una superficie enharinada y forrar con ella el molde. Retirar el exceso de masa y volver a guardar en la nevera mientras preparamos el relleno de nuestro pastel de uvas.
        Truco: Es preferible dejar una capa de masa fina.
        4. Precalentar el horno a 180 ºC para tenerlo caliente en el momento de hornear el pastel.
        A continuación, mezclaremos las uvas con la mitad del azúcar y dejar reposar unos minutos.
        5. Aparte, en un bol batimos los huevos con la leche y la nata fría, con el resto de azúcar y la harina. Utilizamos unas varillas manuales y mezclamos hasta que no quede ningún grumo de harina y el relleno esté completamente homogéneo y con todos los ingredientes integrados.
        6. Ahora sacamos el molde forrado de la nevera y vaciamos la crema dentro, cubrimos bien el fondo con la mezcla.
        Reserva una parte de mezcla para el final.
        7. Incorpora las uvas azucaradas por encima de la cama de crema para montar nuestro pastel de uvas frescas.
        8. Cubrir con el resto de masa y hornear a 180 ºC con calor arriba y abajo durante 45 minutos.
        Tapar el pastel con papel de uvas con aluminio si ves que se está tostando en exceso la superficie. Pasado los 45 minutos, si al pinchar con un palillo, al sacarlo, todavía quedan restos de masa, apagar el horno y dejarlo que se enfríe completamente en su interior. Una vez frío, pasar a la nevera hasta el día siguiente.
        9. Este pastel de uvas frescas se debe consumir frío, cortado en rodajas no muy gruesas.`,
        userId: id,
        collectionId: 2,
        tags: [1]
    },
    {
        title: 'Renovación permiso de conducir',
        content: '15/09/21',
        userId: id,
        collectionId: null,
        tags: [3]
    },
    {
        title: 'Álgebra abstracta',
        content: `El álgebra abstracta, es una parte de la matemática que se encarga del estudio de estructuras algebraicas como vectores, cuerpo, anillo, grupo. Este tipo de álgebra, puede ser llamada como álgebra moderna.`,
        userId: id,
        collectionId: 3,
        tags: []
    },
    {
        title: 'Buffer',
        content: `Los buffer son conjuntos de datos en crudo, datos binarios, que podemos tratar en NodeJS para realizar diversos tipos de acciones. Los implementa Node a través de una clase específica llamada Buffer, que era necesaria porque Javascript tradicionalmente no era capaz de trabajar con tipos de datos binarios.`,
        userId: id,
        collectionId: 1,
        tags: [7]
    },
    {
        title: 'Cuentas a pagar',
        content: `• Tarjeta de credito - $10.000
        • Celular - $1.500
        • Curso - $1.800`,
        userId: id,
        collectionId: null,
        tags: [3]
    },
    {
        title: 'UseEffect',
        content: `Es un hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta.`,
        userId: id,
        collectionId: 1,
        tags: [5]
    },
    {
        title: 'Álgebra lineal',
        content: `El álgebra lineal, se encarga principalmente del estudio de vectores, matrices, sistemas de ecuaciones lineales. No obstante, este tipo de división de álgebra se extiende a otras áreas como ingeniería, computación, entre otras.`,
        userId: id,
        collectionId: 3,
        tags: []
    },
    {
        title: 'Redux',
        content: `Redux es una librería que nos va a ayudar a mantener el estado global de nuestra aplicación.
        El problema de mantener el estado de una aplicación en un único contenedor es que los componentes terminan demasiado acoplados a los contenedores, bajando su resusabilidad. 
        Ademas, en estos contenedores vamos a tener que escribir funciones que manejan el estado de varios componentes, haciendo que este archivo se convierta en inmanejable de forma rápida. Justamente, Redux nos va a ayudar a resolver estos problemas con el paradigma que implementa.`,
        userId: id,
        collectionId: 1,
        tags: [6],
    },
];

const tags = [
    {
        name: 'Reposteria',
        color: '#B592A0',
        userId: id,
        id: 1
    },
    {
        name: 'Casa',
        color: '#79ADDC',
        userId: id,
        id: 2
    },
    {
        name: 'Personal',
        color: '#FFC09F',
        userId: id,
        id: 3
    },
    {
        name: 'Salados',
        color: '#FFEE93',
        userId: id,
        id: 4
    },
    {
        name: 'React',
        color: '#ADF7B6',
        userId: id,
        id: 5
    },
    {
        name: 'Redux',
        color: '#DCB6D5',
        userId: id,
        id: 6
    },
    {
        name: 'NodeJS',
        color: '#F2F7F2',
        userId: id,
        id: 7
    }
];

//Modifica con datos por defecto | Updates user with default data
server.put('/chargeData', (req, res, next) => {
    try {
        User.update(
            {
                name: 'Valentín',
                lastname: 'Nicheglod',
                ocupation: 'Desarrollador Web',
                gender: 'male',
                email: 'admin@admin.com',
                password: 'aDmIn123',
                phone: null
            },
            { where: { id } }
        )
        tags.map((tag) => {
            Tag.update( 
                {
                    name: tag.name,
                    color: tag.color
                },
                {
                    where: { id: tag.id }
                }
            )
        })
        collections.map((collection) => {
            Collection.update( 
                {
                    name: collection.name,
                    description: collection.description
                },
                {
                    where: { id: collection.id }
                }
            )
        })
        notes.map((note, index) => {
            const noteId = index + 2;
            Note.update(
                {
                    title: note.title,
                    content: note.content,
                    collectionId: note.collectionId,
                    state: 'main-dashboard'
                },
                {
                    where: { id: noteId }
                }
            )
            .then(async () => {
                try {
                    const updatedNote = await Note.findByPk(noteId);
                    await updatedNote.setTags([]);
                    note.tags.map(async (tagId) => {
                        const tag = await Tag.findByPk(tagId);
                        await updatedNote.addTags(tag);
                    })
                } catch (error) {
                    console.log(error);
                }
            });
        })
        return res.send("Hecho")
	} catch (error) {
		return next(error);
	}
});

//Elimina datos creados en modo invitado | Deletes created data in guest mode
server.delete('/deleteAditionalData', async (req, res, next) => {
    try {
        const notes = await Note.findAll({
            where: { userId: id },
            include: [{
                model: Tag
            }]
        })
        await notes.map((note) => {
            if (note.id > 23) {
                Note.destroy(
                    { where: { id: note.id } }
                )
            }
        })
        const tags = await Tag.findAll({
            where: { userId: id }
        })
        await tags.map((tag) => {
            if (tag.id > 7) {
                Tag.destroy(
                    { where: { id: tag.id } }
                )
            }
        })
        const collections = await Collection.findAll({
            where: { userId: id }
        })
        await collections.map((collection) => {
            if (collection.id > 4) {
                Collection.destroy(
                    { where: { id: collection.id } }
                )
            }
        })
		return res.send('Hecho');
	} catch (error) {
		return next(error);
	}
});

module.exports = server;