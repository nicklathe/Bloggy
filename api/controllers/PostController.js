/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create:function(req, res){
        var postData = {
            title:req.body.title,
            body:req.body.body,
            owner: req.session.user.id
        };
        Post.create(postData).exec(function(err,post){
            if(err) res.send(400,err);
            post.owner = req.session.user;
            Post.publishCreate(post);
            res.send(post);
        });
    },
    addComment:function(req, res){
        var commentData = {
            body:req.body.body,
            post:req.params.postId,
            owner:req.session.user.id
        };
        //same as the create above, but this is the waterline way
        Comment.create(commentData).then(function(comment){
            comment.owner = req.session.user;
            res.send(comment);
        }).catch(function(err){
            res.send(400,err);
        })
    },
    getComments:function(req, res){
        Comment.find({where:{post:req.params.postId}}).populate('owner').then(function(comments){
            res.send(comments);
        }).catch(function(err){
            res.send(err);
        });
    }
};

