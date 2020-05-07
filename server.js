const express = require( 'express' );
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const { DATABASE_URL, PORT } = require( './config' );
const { Authors } = require( './models/authors-model' );
const { Comments } = require( './models/comments-model' );

const app = express();
const jsonParser = bodyParser.json();

app.get( '/blog-post/authors', ( req, res ) => {
    Authors
        .getAllAuthors()
        .then( authors => {
            return res.status( 200 ).json( authors );
        })
        .catch( err => {
            res.statusMessage = "Something went wrong when retrieving the Authors.";
            return res.status( 400 ).end();
        });
});

app.post( '/blog-post/createAuthor', jsonParser, ( req, res ) =>{
    const { firstName, lastName, id, password } = req.body;

    // Validations are missing here
    const newAuthor = {
        firstName,
        lastName,
        id,
        password
    };
    
    Authors
        .createAuthor( newAuthor )
        .then( createdAuthor => {
            return res.status( 201 ).json( createdAuthor );
        })
        .catch( err => {
            res.statusMessage = "Something went wrong when creating the Author.";
            return res.status( 400 ).end();
        });
});

app.post( '/blog-post/createComment', jsonParser, ( req, res ) => {
    const { title, content, idUser } = req.body;

    console.log( idUser );
    Authors
        .getAuthorById( idUser )
        .then( author => {
            const newComment = {
                title,
                content,
                author : author._id
            };

            Comments
                .createComment( newComment )
                .then( createdComment => {
                    return res.status( 201 ).json( createdComment );
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong when creating the Author.";
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status( 400 ).end(); 
        });

});

app.get( '/blog-post/comments', ( req, res ) => {
    Comments
        .getAllComments()
        .then( comments => {
            return res.status( 200 ).json( comments ); 
        })
        .catch( err => {
            res.statusMessage = "Something went wrong when retrieving the Comments.";
            return res.status( 400 ).end();
        });
});

app.get( '/blog-post/getCommentsByAuthorId/:idUser', ( req, res ) => {
    const { idUser } = req.params;

    Authors
        .getAuthorById( idUser )
        .then( author => {
            const authorObjectId = author._id;

            Comments
                .getCommentsByAuthorId( authorObjectId )
                .then( comments => {
                    return res.status( 200 ).json( comments );
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong when retrieving the Author's comments.";
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status( 400 ).end(); 
        });
});

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