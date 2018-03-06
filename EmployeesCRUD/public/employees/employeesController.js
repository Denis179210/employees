employeesApp.controller('employeesController', function($scope, $http) {
    $http.get('/api/employe/amount')
        .then((res) => {
            console.log(res.data);
            $scope.employeesAmount = res.data;
            $scope.rate = $scope.employeesAmount / 10; 
            $scope.pages = [];
            for(var page = 0; page < $scope.rate; page++) {
                $scope.pages.push(page);
            } 
            
            console.log("PAGES------------: ", $scope.pages);

            $scope.fetchEmployees(0);

        })
        .catch(console.error)
        

    $scope.fetchEmployees = function(rate) {
        console.log(rate);
        $scope.decimal = rate;
        $http.get(`/api/employe?rate=${rate}`)
            .then((res) => {
                console.log(res.data);
                $scope.employees = res.data
            })
            .catch(console.error)
    }

    $scope.prevPage = function(rate) {
        console.log(rate);
        if(rate < 0) {
            rate = 0
        }
        $scope.fetchEmployees(rate); 
    }

    $scope.nextPage = function(rate) {
        if(rate >= $scope.pages.length) {
            rate -= 1;
        }
        $scope.fetchEmployees(rate);
    }
})