const express = require( 'express' );
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const { DATABASE_URL, PORT } = require( './config' );

const app = express();

app.listen( PORT, () =>{
    console.log( "This server is running on port 8080" );

    new Promise( ( resolve, reject ) => {

        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});