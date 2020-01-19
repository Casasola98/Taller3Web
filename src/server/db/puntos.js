let connection =  require('./index');

const SELECTUSERS = 'SELECT usuario, nombre, apellidos from usuarios';

const all = async () =>{ //Returns all usernames
    return new Promise((resolve,reject)=>{

        connection.connection.query(SELECTUSERS, (err, results) =>{
            return (err) ?  reject(err) : resolve({usuarios: results});
        });

    });
}

const login = async (usuario) =>{
    return new Promise((resolve,reject) =>{
        let sql = "SELECT * FROM puntos WHERE ruta = ?"
        let params = [usuario];
        connection.connection.query(sql,params, async (err, results) =>{
            return  resolve({puntos: results}); 
        });
    });
}

const register = async (nombre, apellidos, correo, usuario, password) =>{
    return new Promise((resolve,reject) =>{
        //Verificamos si podemos registrar el usuario:
        let existsQuery = "SELECT usuario FROM usuarios WHERE usuario = ?";
        let params = [usuario];
        let exists = false;
        connection.connection.query(existsQuery, params,function (err, data) {
                if (!err) 
                    exists = data.length > 0;
        });
        if(!exists){
            let sql = "INSERT INTO usuarios(nombre,apellidos,correo,usuario,password) VALUES (?,?,?,?,?)"
            params = [nombre, apellidos, correo, usuario, password];
            connection.connection.query(sql,params, (err, results) =>{
                return (err) ?  reject(err) : resolve({result: true});
            });
        }
        else
            return reject("Error: el usuario ya existe");   
    });
}


module.exports.all = all;
module.exports.login = login;
module.exports.register = register;

module.exports.default = {
    all,
    login,
    register
}