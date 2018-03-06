employeesApp.controller('employeesController', function($scope, $http, employeService) {
    
    employeService.getAmount(function(res) {
                console.log("PAGES------------: ",  res.amount);
                $scope.employeesAmount = res.amount;
                $scope.rate = res.amount / 10; 
                $scope.pages = [];
                for(var page = 0; page < $scope.rate; page++) {
                    $scope.pages.push(page);
                } 
                $scope.fetchEmployees(0);
                console.log("PAGES------------: ",  $scope.pages);
            });
    
    


    $scope.fetchEmployees = function(rate) {


        $scope.employees = employeService.getMany(rate)
            // .then(console.log);
        console.log($scope.employees);
        $scope.decimal = rate;

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