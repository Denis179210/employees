var employeesApp = angular.module('employeesApp', ['ui.router']);
    employeesApp.run(function($http) {
        $http.get('/api/reload')
            .then((resp) => {

                var clientReload = document.createElement('script');
                    clientReload.setAttribute('src', `${resp.data}`);
                    document.body.insertBefore(clientReload, document.querySelector('.entry_point'));

            })
    });
   