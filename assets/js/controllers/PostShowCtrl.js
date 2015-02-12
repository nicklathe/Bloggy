myBlogApp.controller('PostShowCtrl', ['$scope', '$http', '$routeParams', '$location', '$modal', function($scope, $http, $routeParams, $location, $modal){


    var postId = $routeParams.id;
    $http.get('/api/post/' + postId).success(function(data){
        $scope.post = data;
    }).error(function(err){
        $location.path('/');
        alert('That post could not be found');
    })

    $http.get('/api/post/' + postId + '/comments')
    .success(function(data){
        $scope.comments = data
    });

    $scope.editPost = function(){
        $modal.open({
            templateUrl: '/views/post/editModal.html',
            controller: 'PostEditModalCtrl',
            resolve: {
                post: function(){
                    return $scope.post;
                }
            }
        }).result.then(function(updatedPost){
            $scope.post = updatedPost;
        }, function(){

        })
    };

    $scope.addComment = function(){
        var commentData = {body: $scope.commentText}
        $http.post('/api/post/' + postId + '/comments/', commentData)
        .success(function(data){
            $scope.commentText = "";
            $scope.comments.unshift(data);
        }).error(function(err){
            alert(err)
        });
    }

}]);