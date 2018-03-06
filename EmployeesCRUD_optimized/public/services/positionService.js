employeesApp.service('positionService', function($http) {

    // var positions = null;

    function getPositions() {
        return $http.get('/api/position')

    // return new Promise(function(resolve, reject) {
    //         if(positions) {
    //             resolve(positions)
    //         } else {
    //             resolve($http.get('/api/position'))
    //         }
    //     }).then((result) => {
    //         if(result.headers) {
    //             return result.data
    //         } else {
    //             return result
    //         }
    //     })
    }
    
    return {
        get: getPositions
    }
})

