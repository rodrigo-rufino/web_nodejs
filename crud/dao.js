var mysql = require("mysql");

var con = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'ec021'
}

module.exports = {
    insertToddy: (toddy) => {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection(con);
            connection.connect();
        
            var strQuery = "INSERT INTO toddy (lote, conteudo, validade)" +
                            "VALUE ('" +
                            toddy.lote + "', '" +
                            toddy.conteudo + "', '" +
                            toddy.validade + "');";
            console.log(strQuery);
        
            connection.query(strQuery, function(err, rows, fields){
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            });
            
            connection.end();
        }
    )},

    updateToddy: (toddy) => {
        var connection = mysql.createConnection(con);
        connection.connect();
    
        var strQuery = 	"UPDATE toddy SET" +
                        " lote = '" 		+ toddy.lote +
                        "', conteudo = '" 	+ toddy.conteudo +
                        "', validade = '" 	+ toddy.validade +
                        "' WHERE id = '" 	+ toddy.id + "';";
        
        console.log(strQuery);
    
        connection.query(strQuery, function(err, rows, fields){
            if (!err) {
                return rows;
            } else {
                return err;
            }
        });
    
        connection.end();
    },

    getToddy: () => {
        var connection = mysql.createConnection(con);
        connection.connect();
    
        var strQuery = 	"SELECT * FROM toddy;";
        
        console.log(strQuery);
    
        connection.query(strQuery, function(err, rows, fields){
            if (!err) {
                return rows;
            } else {
                return err;
            }
        });
    
        connection.end();
    },

    getToddyExpirationDate: () => {
        
        var connection = mysql.createConnection(con);
        connection.connect();

        var strQuery = 	"SELECT * FROM toddy;";
        
        console.log(strQuery);

        connection.query(strQuery, function(err, rows, fields){
            if (!err) {
                var val = [];
                for (i = 0; i< rows.length; i++){
                    var parts =rows[i].validade.split('/');
                    var mydate = new Date(parts[2], parts[1] - 1, parts[0]); 

                    if (mydate <= Date.now()){
                        val = [...val, rows[i]];
                    }
                }
                return val;
            } else {
                return err;
            }
        });

        connection.end();
    },

    getToddyId: (toddy) => {
        var connection = mysql.createConnection(con);
        connection.connect();

        var strQuery = 	"SELECT * FROM toddy WHERE id = " + toddy.id +";";
        
        console.log(strQuery);

        connection.query(strQuery, function(err, rows, fields){
            if (!err) {
                return rows;
            } else {
                return err;
            }
        });

        connection.end();
    },

    deleteToddy: (toddy) => {
        var connection = mysql.createConnection(con);
        connection.connect();
    
        var strQuery = 	"DELETE FROM toddy WHERE id = '" + toddy + "';";
        
        console.log(strQuery);
    
        connection.query(strQuery, function(err, rows, fields){
            if (!err) {
                return rows;
            } else {
                return err;
            }
        });
    
        connection.end();
    }
}