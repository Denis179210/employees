employeesApp.config(function($stateProvider, $locationProvider) {

    $stateProvider
        .state({
            name: 'index',
            url: '/',
            templateUrl: '<ui-view></ui-view>',
            // abstract: true
        })
        .state({
            name: 'employees',
            url: '/employees/',
            // component: 'employeesComponent'
            templateUrl: 'employees/employees.html',
            controller: 'employeesController'
        })
        .state({
            name: 'employe',
            url: '/employees/employe',
            templateUrl: 'employe/employe.html'
        })
        .state({
            name: 'addEmploye',
            url: '/employees/addEmploye',
            templateUrl: 'addEmploye/addEmploye.html',
            controller: 'addEmployeController'
        })


        $locationProvider.html5Mode(true);
})