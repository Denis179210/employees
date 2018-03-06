employeesApp.service('statusService', function($http) {

    // var statuses = null;

    function getStatuses() {
        return $http.get('/api/status')
        // return new Promise(function(resolve, reject) {
        //         if(statuses) {
        //             resolve(statuses)
        //         } else {
        //             resolve($http.get('/api/status'))
        //         }
        //         }).then((result) => {
        //             if(result.headers) {
        //                 return result.data
        //             } else {
        //                 return result
        //             }
        //         })
    }
    
    return {
        get: getStatuses 
    }
})


