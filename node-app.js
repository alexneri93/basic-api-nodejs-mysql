//APP INIT
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');  //Parsea datos recibidos por POST a Json
const cors = require('cors');   //Configura cabeceras de la API REST de forma automatica

const PORT = process.env.PORT || 3050;

const app = express();

app.disable('x-powered-by');    //para evitar que se vea que nuestra app está hecha con node y express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());


//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// -- Get all players
app.get('/players', (req, res) => {
    const sql = 'SELECT * FROM player';
    connection.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length > 0){
            res
                .status(200)
                .json(results);
        }else{
            res
                .status(404)
                .json({message: 'No results'});
        }
    })
});

// -- Get player by name
app.get('/players/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM player WHERE nombre = "${id}"`;
    connection.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length > 0){
            res
                .status(200)
                .json(results);
        }else{
            res
                .status(404)
                .json({message: 'No results'});
        }
    })
});

// -- Add player
app.post('/add-player', (req, res) => {
    const sql = 'INSERT INTO player SET ?';

    const playerObj = {
        nombre: req.body.nombre,
        level: req.body.level,
        experience: req.body.experience,    
        money: req.body.money
    }

    connection.query(sql, playerObj, err => {
        if(err) throw err;
        res
            .status(201)
            .json({message: 'Player created'});
    });

});

// -- Update player
app.put('/update-player/:id', (req, res) => {
    const {id} = req.params;
    const {level, experience, money} = req.body;
    const sql = `UPDATE player SET level = ${level}, experience = ${experience}, money = ${money} WHERE nombre = '${id}'`;

    connection.query(sql, err => {
        if(err) throw err;
        res
            .status(200)
            .json({message: 'Player updated'});
    });
});

// -- Delete player
app.delete('/delete-player/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM player WHERE nombre = '${id}'`; 

    connection.query(sql, err => {
        if(err) throw err;
        res
            .status(200)
            .json({message: 'Player deleted'});
    });
});


//DATABASE
//MySQL DB CONFIG
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pruebaapi'
});

// Check connection
connection.connect(error => {
    if(error) throw error;
    console.log('Database connection succesfull');
})

// APP LISTEN
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));


