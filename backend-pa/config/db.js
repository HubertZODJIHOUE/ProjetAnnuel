const {Sequelize} =require('sequelize')
const sequelize = new Sequelize(
    'ecologie' , // Nom de la BDDs
    'root', // username par defaut c'est bien root sur
    'ecologie',// le mot de passe  d
    {   port: 3334,
        host :'localhost',
        dialect :'mysql', 
        dialectOptions :{

            //permet d'eviter l'affichage des warning dans la console 
            // pas obliger de le faire 

        },
        logging:false
    }

)

module.exports=sequelize