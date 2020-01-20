let connection =  require('./index');

const GETRUTAS = "SELECT nombre FROM rutas";

const rutas = async () =>{
    return new Promise((resolve,reject)=>{
        connection.connection.query(GETRUTAS, async (err, results) =>{
            if(err)
                return reject(err);
            else{
                resolve({rutas: results});
            }
            
        });

    });
}

const addRuta = async (nombre, descripcion) =>{
    return new Promise((resolve,reject) =>{
        let sql = "INSERT INTO rutas (nombre, descripcion) VALUES (?,?)";
        let params = [nombre, descripcion];
        connection.connection.query(sql,params, async (err, results) =>{
            return  resolve({puntos: results}); 
        });
    });
}

module.exports.rutas = rutas;
module.exports.addRuta = addRuta;
module.exports.default = {
    rutas,
    addRuta
}