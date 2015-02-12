myBlogApp.controller('AuthModalCtrl', ['$scope', '$http', '$modalInstance', 'UserService', 'AlertService', function($scope, $http, $modalInstance, UserService, AlertService){

    $scope.loginData = {email:'', password: ''};
    $scope.signupData = {};

    $scope.login = function(){
        UserService.login($scope.loginData.email, $scope.loginData.password, function(err, data){
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

    $scope.signup = function(){

        if($scope.signupPassword != $scope.signupPasswordConfirm){
            alert("password doesn't match");
        };
        var signupData = {
            email: $scope.signupEmail,
            password: $scope.signupPassword,
            firstName: $scope.signupFirstName,
            lastName: $scope.signupLastName
        };
        $http.post('/api/user', signupData)
        .success(function(data){
            $modalInstance.close();
            AlertService.add('success', 'You have been signed up');
        }).error(function(err){
            alert(err);
        })
    }
}])