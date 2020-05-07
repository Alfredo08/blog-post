const mongoose = require( 'mongoose' );

const commentSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : 'authors'
    }
});

const commentCollection = mongoose.model( 'comments', commentSchema );

const Comments = {
    createComment : function( newComment ){
        return commentCollection
                .create( newComment )
                .then( createdComment => {
                    return createdComment;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getAllComments : function(){
        return commentCollection
                .find()
                .populate( 'author', ['firstName', 'lastName'] )
                .then( allComments => {
                    return allComments;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getCommentsByAuthorId : function( authorObjectId ){
        return commentCollection
                .find( { author : authorObjectId } )
                .populate( 'author', ['firstName', 'lastName'])
                .then( allComments => {
                    return allComments;
                })
                .catch( err => {
                    throw new Error( err );
                });
    }
}

module.exports = {
    Comments
};