myBlogApp.controller('AuthModalCtrl', ['$scope', '$modalInstance', 'UserService', function($scope, $modalInstance, UserService){

    $scope.login = function(){
        UserService.login($scope.email, $scope.password, function(err, data){
            if(err){
                alert(err);
                //server err
            } else if(data.user){
                //succesful login
                $modalInstance.close();
            } else {
                //login error (bad user email or password)
                alert(data.error);
            }

        });
    }
}])