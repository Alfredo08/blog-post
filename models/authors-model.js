const mongoose = require( 'mongoose' );

const authorSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    id : {
        type : Number,
        required : true,
        unique : true
    }
});

const authorModel = mongoose.model( 'authors', authorSchema );

const Authors = {
    createAuthor : function( newAuthor ){
        return authorModel
                .create( newAuthor )
                .then( author => {
                    return author;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getAllAuthors : function(){
        return authorModel
                .find()
                .then( authors => {
                    return authors;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getAuthorById : function( id ){
        return authorModel
                .findOne( { id } )
                .then( author => {
                    return author;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    }
}

module.exports = {
    Authors
};