employeesApp.service('employeService', function($http, $resource) {
    var _order = undefined;
    var employees = $resource('/api/employe/:id', {}, {
        amount: {
            method: 'GET',
            url: '/api/employe/amount',
            isArray: false,
            hasBody: false
        },
        update: {
            method: 'PUT',
            url: '/api/employe/:id',
            params: {id: '@_id'},
            isArray: false,
            hasBody: true
        }
    });
    
    return {
           create: createNewEmploye,
          getMany: getEmployees,
        getAmount: getTotalEmployeesAmount,
           getOne: getEmployeById,
           update: updateEmploye,
           remove: removeEmploye,
    }


    
    function createNewEmploye(employe) {
        // return $http.post('/api/employe', employe);
        return employees.save(employe);
    }

    function getEmployees(rate) {
        if(!rate) {
            // return $http.get('/api/employe');
            return employees.query();
        } else {
            // var keys = Object.keys(query);
            // var values = Object.values(query);
            // var params = '?';

            // for(var pair = 0; pair < keys.length; pair++) {
            //     params = `${params}&${keys[pair]}=${values[pair]}`
            // }
            
            // return $http.get(`/api/employe${params}`);
            return employees.query({
                rate: rate,
                isArray: true
            })
        }
        
    }

    function getEmployeById(param) {
        // return $http.get(`/api/employe/${id}`);
        return employees.get(param)
    }

    function updateEmploye(update) {
        // return $http.put(`/api/employe/${id}`, update);
        // employees.get(param, function() {
            
        // })
        // return employees.get({id: id}, function() {
        //     console.log(employees.get({id: id}))
        // }).$save(update);
        return employees.update(update);
    }

    function removeEmploye(id) {
        // return $http.delete(`/api/employe/${id}`);
        return employees.remove({id: id})
    }
    function getTotalEmployeesAmount(callback) {
        // return $http.get('/api/employe/amount');
        return employees.amount(callback);
    }
})


