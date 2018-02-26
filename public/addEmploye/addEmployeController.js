employeesApp.controller('addEmployeController', function($scope) {
    
    $scope.newEmploye = {};
    $scope.showPreview = function(context) {
        $scope.readURL(context);
    }

    $scope.flag = false;
    $scope.readURL = function(input) {
        if(input.files && input.files[0]) {
          
            var preview = new FileReader();
                preview.onload = function() {
                    $scope.url = this.result;
                    angular.element('.preview').attr('src', $scope.url);
                }
                preview.readAsDataURL(input.files[0])
                console.log(preview.readAsDataURL(input.files[0]));
        }
    }
    $scope.checkFlag = function(arg) {
        return $scope.flag = arg;
    }
    $scope.done = function() {
        console.log($scope.newEmploye);
    }
})