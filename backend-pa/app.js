
//---------------connexion à la BDD------------
const {DataTypes} =require('sequelize')
const UserModel = require('./model/user')
const sequelize = require('./config/db');
const express=require('express');
const bodyParser = require('body-parser')
const userRoutes=require('./routes/userRoutes');
//creation de l'application express
const app = express();

//// Configuration du middleware pour parser le corps de la requête en JSON
app.use(bodyParser.json());

app.use('/users', userRoutes); //il faut configurer un midlware
// https://www.google.com/search?q=CRUD+mysql+nodejs+sequelize&rlz=1C1JJTC_frFR1010FR1010&oq=CRUD+mysql+nodejs+sequelize&aqs=chrome..69i57j0i22i30l2.11339j1j4&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:fbff4cd7,vid:BG_ybc1_fPE

// const sequelize = new Sequelize(
//     'ecologie' , // Nom de la BDDs
//     'root', // username par defaut c'est bien root sur
//     'ecologie',// le mot de passe  
//     {   port: 3334,
//         host :'localhost',
//         dialect :'mysql', 
//         dialectOptions :{

//             //permet d'eviter l'affichage des warning dans la console 
//             // pas obliger de le faire 

//         },
//         logging:false
//     }

// )

sequelize.authenticate()
.then(_=> console.log('la connexion a reussit'))
.catch(error=> console.error(`la connexion n\'a pas aboutit ${error}`))

// const user = UserModel(sequelize, DataTypes)


sequelize.sync({force: true})
.then(_ =>console.log('La table à été bien synchronisé'))


//-------------------------------- ------------
 // recupere expres

const port = 3000
app.get('/', (req, res) =>{res.send('Hello world express'); console.log(req)}); 

app.listen(port ,()=>console.log(`L\'application tourne sur le port : http://localhost:${port}`));
//nodemon execute le projet en tache de fond en prenant en compte les derniere modifications
// on l'execute avec la commande npm install nodemon --save-dev