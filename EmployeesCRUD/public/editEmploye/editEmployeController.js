employeesApp.controller('editEmployeController', function($scope, $http, $state, $stateParams) {

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
    
    $http.get(`/api/employe/${$stateParams.id}/`)
        .then((res) => {

            $scope.employe = res.data;

            console.log($scope.employe);

            $scope._availabilityFullTime = (function() {
                if($scope.employe.normatives.availability.indexOf('fullTime') === -1) {
                    return false
                    
                } else {
                    return 'fullTime'
                }
            }());
            $scope._availabilityPartTime = (function() {
                if($scope.employe.normatives.availability.indexOf('partTime') === -1) {
                    return false
                    
                } else {
                    return 'partTime'
                }
            }());

            $scope.pointerFT = $scope.employe.normatives.availability[$scope.employe.normatives.availability.indexOf('fullTime')];
            $scope.pointerPT = $scope.employe.normatives.availability[$scope.employe.normatives.availability.indexOf('partTime')];

            $scope._url = $scope.employe.photo;

            $scope.runFull = function() {
                console.log("cheking",   $scope._availabilityFullTime);
                if(
                    $scope.employe.normatives.availability.length < 2 &&
                    $scope._availabilityFullTime &&
                    $scope.employe.normatives.availability.indexOf($scope._availabilityFullTime) === -1
                    ) {
                        $scope.employe.normatives.availability.push($scope._availabilityFullTime);
                        $scope.pointerFT = (function() {
                            return $scope._availabilityFullTime
                        }())
                        
                        console.log($scope.employe.normatives.availability);
            
                    } else if(!$scope._availabilityFullTime ){
                        console.log('FT', $scope.pointerFT);
                        $scope.employe.normatives.availability.splice($scope.employe.normatives.availability.indexOf($scope.pointerFT), 1);
                        console.log($scope.employe.normatives.availability)
                    }
                    // console.log("cheking", $scope.employe.normatives.availability)
            }
        
                
            $scope.runPart = function() {
                if(
                    $scope.employe.normatives.availability.length < 2 &&
                    $scope._availabilityPartTime &&
                    $scope.employe.normatives.availability.indexOf($scope._availabilityPartTime) === -1
                    ) {
                        $scope.employe.normatives.availability.push($scope._availabilityPartTime);
                        $scope.pointerPT = (function() {
                            return $scope._availabilityPartTime
                        }())
                        
                        console.log($scope.employe.normatives.availability);
                        
            
                    } else if(!$scope._availabilityPartTime){
                        console.log('PT', $scope.pointerPT);
                        $scope.employe.normatives.availability.splice($scope.employe.normatives.availability.indexOf($scope.pointerPT), 1);
                        console.log($scope.employe.normatives.availability)
                    }
                    // console.log("cheking", $scope.employe.normatives.availability)
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
            $scope.getSRC = function() {
                return $scope.employe.photo
            }
            $scope.clearURL = function() {
                $scope._url = "";
                // $scope.employe.photo = ""
            }
        
            $scope.done = function(e) {
                console.log($scope.employe)
                $http.put(`/api/employe/${$scope.employe._id}`, $scope.employe)
                    .then((res) => {
                        console.log('FUCK-------------',res.data)
                        $state.go('index.employe',{id: $scope.employe._id})
                    })
                    .catch(console.error)
            }
        })
})