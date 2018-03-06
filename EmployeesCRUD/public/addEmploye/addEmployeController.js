employeesApp.controller('addEmployeController', function($scope, $http, $state, $location) {

    $http.get('/api/position')
        .then((res) => {
            $scope.positions = res.data
        })
        .catch(console.error)

    $http.get('/api/status')
        .then((res) => {
            $scope.statuses = res.data
        })
        .catch(console.error)




    $scope.newEmploye = {};
    $scope.newEmploye.normatives = {};
    $scope.newEmploye.normatives.availability = [];
    $scope.defaultImage = `http://localhost:${$location.port()}/photo/mask.png`;
    
    console.log('LOCATION_______________:',  $location.port());
    
    $scope.runFull = function() {
        if(
            $scope.newEmploye.normatives.availability.length < 2 &&
            $scope._availabilityFullTime &&
            $scope.newEmploye.normatives.availability.indexOf($scope._availabilityFullTime) === -1
            ) {
                $scope.newEmploye.normatives.availability.push($scope._availabilityFullTime);
                $scope.pointerFT = (function() {
                    return $scope._availabilityFullTime
                }())
                
                console.log($scope.newEmploye.normatives.availability);
    
            } else if(!$scope._availabilityFullTime){
                $scope.newEmploye.normatives.availability.splice($scope.newEmploye.normatives.availability.indexOf($scope.pointerFT), 1);
                console.log($scope.newEmploye.normatives.availability)
            }
    }

        
    $scope.runPart = function() {
        if(
            $scope.newEmploye.normatives.availability.length < 2 &&
            $scope._availabilityPartTime &&
            $scope.newEmploye.normatives.availability.indexOf($scope._availabilityPartTime) === -1
            ) {
                $scope.newEmploye.normatives.availability.push($scope._availabilityPartTime);
                $scope.pointerPT = (function() {
                    return $scope._availabilityPartTime
                }())
                
                console.log($scope.newEmploye.normatives.availability);
                
    
            } else if(!$scope._availabilityPartTime){
                console.log('PT', $scope.pointerPT);
                $scope.newEmploye.normatives.availability.splice($scope.newEmploye.normatives.availability.indexOf($scope.pointerPT), 1);
                console.log($scope.newEmploye.normatives.availability)
            }
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
    $scope.getSRC = function() {
        return $scope.newEmploye.photo
    }
    $scope.clearURL = function() {
        $scope._url = "";
    }

    $scope.done = function(e) {
        $http.post('/api/employe', $scope.newEmploye)
            .then((res) => {
                console.log(res.data)
                // $state.go('index.employees')
                $state.go('index.employe',{id: res.data._id})
            })
            .catch(console.error)
    }
})