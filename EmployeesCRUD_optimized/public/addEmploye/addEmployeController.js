employeesApp.controller('addEmployeController', 
    function( $scope, $http, $state, $location,
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




        $scope.newEmploye = {};
        $scope.newEmploye.normatives = {};
        $scope.newEmploye.normatives.availability = [];
        $scope.defaultImage = `http://localhost:${$location.port()}/photo/mask.png`;
        
        console.log('LOCATION_______________:',  $location.port());
    
        $scope.runFull = function(full) {
            var pointer = $scope.newEmploye.normatives.availability.indexOf(full);
            if(pointer > -1) {
                $scope.newEmploye.normatives.availability.splice(pointer, 1);
            } else { 
                $scope.newEmploye.normatives.availability.push(full);
            }
           
                console.log("cheking", $scope.newEmploye.normatives.availability)
        }
    
            
        $scope.runPart = function(part) {
            var pointer = $scope.newEmploye.normatives.availability.indexOf(part);
            if(pointer > -1) {
                $scope.newEmploye.normatives.availability.splice(pointer, 1);
            } else { 
                $scope.newEmploye.normatives.availability.push(part);
            }
           
                console.log("cheking", $scope.newEmploye.normatives.availability)
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
                        
                        $scope.newEmploye.photo = $scope.base64;
                        
                        angular.element('.preview').attr('src', $scope.newEmploye.photo);
                    }
                    preview.readAsDataURL(input.files[0])
            }
        }
        $scope.setURL = function() {
            $scope.newEmploye.photo = $scope._url;
            angular.element('.preview').attr('src', $scope.newEmploye.photo);
        }
      
        $scope.clearURL = function() {
            $scope._url = "";
        }

        $scope.done = function(e) {
            employeService.create($scope.newEmploye).$promise
                .then((res) => {
                    console.log(res)
                    $state.go('index.employe',{id: res._id})
                })
        }
})