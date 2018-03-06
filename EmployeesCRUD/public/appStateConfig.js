employeesApp.config(function($stateProvider, $locationProvider) {

    $stateProvider
        .state({
            name: 'index',
            templateUrl: 'abstract/abstract.html',
            abstract: true,
            resolve: function($stateParams){
                    return $stateParams.id
                }
        })
        .state({
            name: 'index.employees',
            url: '/',
            templateUrl: 'employees/employees.html',
            controller: 'employeesController'
        })
        .state({
            name: 'index.employe',
            url: '/employe/:id/',
            templateUrl: 'employe/employe.html',
            controller: 'employeController',
            // resolve: function($stateParams){
            //     return $stateParams.id
            // }
        })
        .state({
            name: 'index.addEmploye',
            url: '/employe/add/',
            templateUrl: 'addEmploye/addEmploye.html',
            controller: 'addEmployeController'
        })
        .state({
            name: 'index.editEmploye',
            url: '/employe/:id/edit/',
            templateUrl: 'editEmploye/editEmploye.html',
            controller: 'editEmployeController'
        })

        $locationProvider.html5Mode(true);
})