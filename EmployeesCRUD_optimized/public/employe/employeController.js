employeesApp.controller('employeController', function($scope, $http, $stateParams, employeService) {
    employeService.getOne({id: $stateParams.id}).$promise
        .then((res) => {
            console.log(res);
            console.log($stateParams)
            $scope.employe = res;
        })
    
})