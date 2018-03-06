employeesApp.controller('sideBarController', function($scope, $http, $state, $stateParams, employeService) {
    
    $scope.employeID = function() {
        if($stateParams.id) {
            return $stateParams.id
        }
    };
     
    $scope.currentState = function() {
        return $state.current
    };
    
    $scope.removeEmploye = function() {
        console.log($stateParams)
        employeService.remove($stateParams.id).$promise
            .then((res) => {
                console.log(res);
                $state.go('index.employees')
            })
    }

})