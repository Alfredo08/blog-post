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
        type: String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const authorCollection = mongoose.model( 'authors', authorSchema );

const Authors = {
    createAuthor : function( newAuthor ){
        return authorCollection
                .create( newAuthor )
                .then( createdAuthor => {
                    return createdAuthor;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getAllAuthors : function(){
        return authorCollection
                .find()
                .then( allAuthors => {
                    return allAuthors;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getAuthorById : function( idUser ){
        return authorCollection
                .findOne({ id : idUser })
                .then( author => {
                    if( !author ){
                        throw new Error( "Author not found" );
                    }
                    return author;
                })
                .catch( err => {
                    throw new Error( err );
                });

    }
}

module.exports = {
    Authors
};