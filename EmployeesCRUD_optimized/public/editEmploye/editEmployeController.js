employeesApp
    .controller('editEmployeController',

    function( $scope, $http, $state,
              $stateParams, $q, statusService, 
              positionService, employeService ) {

        $q.all([
            statusService.get(),
            positionService.get(),
            
        ])
        .then((res) => {

            $scope.statuses = res[0].data;
            $scope.positions = res[1].data;
        })
        
        
        $scope.employe = employeService.getOne({id: $stateParams.id});
        console.log($scope.employe);


                $scope.runFull = function(full) {
                    var pointer = $scope.employe.normatives.availability.indexOf(full);
                    if(pointer > -1) {
                        $scope.employe.normatives.availability.splice(pointer, 1);
                    } else { 
                        $scope.employe.normatives.availability.push(full);
                    }
                   
                        console.log("cheking", $scope.employe.normatives.availability)
                }
            
                    
                $scope.runPart = function(part) {
                    var pointer = $scope.employe.normatives.availability.indexOf(part);
                    if(pointer > -1) {
                        $scope.employe.normatives.availability.splice(pointer, 1);
                    } else { 
                        $scope.employe.normatives.availability.push(part);
                    }
                   
                        console.log("cheking", $scope.employe.normatives.availability)
                }
                
            
                $scope.showPreview = function(context) {
                    $scope.readURL(context);
                }
            
                $scope.readURL = function(input) {
                    if(input.files && input.files[0]) {
                        console.log(input.files);
                        var preview = new FileReader();
                            preview.onload = function() {
                                $scope.base64 = this.result;
                                
                                $scope.employe.photo = $scope.base64;
                                
                                angular.element('.preview').attr('src', $scope.employe.photo);
                            }
                            preview.readAsDataURL(input.files[0])
                    }
                }
                $scope.setURL = function() {
                    $scope.employe.photo = $scope._url;
                    angular.element('.preview').attr('src', $scope.employe.photo);
                }
                
                $scope.clearURL = function() {
                    $scope._url = "";
                }
            
                $scope.done = function(e) {
                    console.log($scope.employe)
                    employeService.update($scope.employe).$promise.then((res) => {
                        console.log(res)
                        $state.go('index.employe',{id: $scope.employe._id})
                    }).catch(console.error);
               
                }
})