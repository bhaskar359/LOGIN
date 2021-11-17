const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

exports.find = (req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connected as ID '+ connection.threadId);
        let searchTerm = req.body.search;
        console.log(searchTerm);
        connection.query('SELECT *  FROM user WHERE email = ?', [searchTerm], (err,rows) => {
            connection.release();
            if(!err){
                res.render('home',{ rows });
            }
            else{
                console.log(err);
            }
            // console.log("The data from the user table : \n",rows);  
        });
    });
}
