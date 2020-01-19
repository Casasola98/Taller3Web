let connection =  require('./index');

const SELECTUSERS = 'SELECT nombre from rutas';

const all = async () =>{ //Returns all usernames
    return new Promise((resolve,reject)=>{

        connection.connection.query(SELECTUSERS, (err, results) =>{
            return (err) ?  reject(err) : resolve({rutas: results});
        });

    });
}

module.exports.all = all;

module.exports.default = {
    all
}