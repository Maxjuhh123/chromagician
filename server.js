const express = require('express');
const http = require('http');
const {Client} = require('pg');
const Palette = require('./src/resources/scripts/palette.js');

const app = express();
const port = 3000;

app.use('/resources', express.static('src/resources'));
app.use('/src', express.static('src'));

app.get('/', (req, res) => res.sendFile('/src/index.html', {root: __dirname}));

const server = http.createServer(app);
server.listen(port);

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '464547',
    port: 5432,
});

client.connect((err) => {
    if (err) console.log(err.message);
    else console.log('Connected to database');
});


app.get("/createPaletteTable", (req, res) => { //table containing all palettes
    let sql = `CREATE TABLE IF NOT EXISTS palettes (id serial PRIMARY KEY, colours text[], created timestamp, modified timestamp)`;
    client.query(sql, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log(result);
            res.send("Palette table created");
        }
    });
});


/**
 * Table containing all users
 * recent, liked and created contain the ids of palettes
 */
app.get("/createUserTable", (req, res) => {
    let sql = `CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, 
        username text, 
        password text, 
        recent int[],
        liked int[],
        created int[])`;
    client.query(sql, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log(result);
            res.send("User table created");
        }
    });
});


/**
 * Adds a palette to the palette table
 * @param {*} palette the palette to add to the table
 */
function insertPalette(palette) {
    if(palette.id != null) {
        let sql = `INSERT INTO palettes (id, colours, created, modified) VALUES ($1, $2, $3, $4)`;
        let values = [palette.id, palette.colours, palette.created, palette.modified];
        client.query(sql, values, (err, result) => {
            if (err) console.log(err.message);
            else {
                console.log(result);
            }
        });
    } else {
        let sql = `INSERT INTO palettes (colours, created, modified) VALUES ($1, $2, $3) RETURNING id`;
        let values = [palette.colours, palette.created, palette.modified];
        client.query(sql, values, (err, result) => {
            if (err) console.log(err.message);
            else {
            console.log(result);
            palette.id = result.rows[0].id;
            }
        });
    }
}


/** return palette with specific id if it exists
 * 
 * @param {*} id - id of palette to be returned 
 */
function findPaletteById(id) {
    let sql = `SELECT * FROM palettes WHERE id = $1`;
    let values = [id];
    client.query(sql, values, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log(result);
            console.log(result.rows[0]);
        }
    });
}

function insertUser(user) {
    let sql = `INSERT INTO users (username, password, recent, liked, created) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    let recentIds = [];
    for(rec of user.recent) {
        recentIds.push(rec.id);
    }
    let likedIds = [];
    for(liked of user.liked) {
        likedIds.push(liked.id);
    }
    let createdIds = [];
    for(created of user.created) {
        createdIds.push(created.id);
    }
    let values = [user.username, user.password, recentIds, likedIds, createdIds];
    client.query(sql, values, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log(result);
            user.setId(result.rows[0].id);
        }
    });
}

function findUserById(id) {
    let sql = `SELECT * FROM users WHERE id = $1`;
    let values = [id];
    client.query(sql, values, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log(result);
            console.log(result.rows[0]);
        }
    });
}

function findUserByName(username) {
    let sql = `SELECT * FROM users WHERE username = $1`;
    let values = [username];
    client.query(sql, values, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log(result);
            console.log(result.rows[0]);
        }
    });
}

const pal = new Palette.constructor(["#ff0000", "#00ff00", "#0000ff"], new Date(), new Date())
insertPalette(pal);
console.log(findPaletteById(pal.id));