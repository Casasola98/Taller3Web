let connection =  require('./index');

const allPuntos = async (rutaS) =>{
    return new Promise((resolve,reject) =>{
        let sql = "SELECT nombre, descripcion, latitud, longitud FROM puntos WHERE ruta = ?"
        let params = [rutaS];
        console.log(params);
        connection.connection.query(sql,params, (err, results) =>{
            return (err) ?  reject(err) : resolve({puntos: results});
        });
    });
}

module.exports.allPuntos = allPuntos;
module.exports.default = {
    allPuntos
}