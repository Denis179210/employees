employeesApp.controller('employeController', function($scope, $http, $stateParams) {
    
    $http.get(`/api/employe/${$stateParams.id}/`)
        .then((res) => {
            console.log(res.data);
            console.log($stateParams.id)
            $scope.employe = res.data;
        })
    
})