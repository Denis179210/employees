employeesApp.service('testServise', function($http, $q) {
    var test = null;
    return {
        get: function(scope) {
            $q(function(res, rej) {
                if(!test) {
                    console.log('HTTP REQUEST')
                    res($http.get('/test'))
                } else {
                    console.log('LOCAL INSTANSE')
                    rej(test)
                }
            }).then((res) => {
                test = res.data;
                scope.info = test;
            }).catch((reason) => {
                console.log(reason, " ALREADY EXIST")
            })
        },
        order: null
    }

})