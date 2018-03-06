employeesApp.controller('sideBarController', function($scope, $http, $state, $stateParams) {
    
    $scope.employeID = function() {
        if($stateParams.id) {
            return $stateParams.id
        }
    };
     
    $scope.currentState = function() {
        return $state.current
    };
    console.log($state.current);

    $scope.removeEmploye = function() {
        console.log($stateParams)
        $http.delete(`/api/employe/${$stateParams.id}`)
            .then((res) => {
                console.log(res.data);
                $state.go('index.employees')
            })
    }

})