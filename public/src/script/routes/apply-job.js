angular.module('scaffold')

.config([
    '$routeProvider',
    'resolve',
    function($routeProvider, resolve) {
        $routeProvider.when('/job/:job/apply', {
            templateUrl: '/static/template/page/apply-job.html',
            controller: 'ApplyJobController',
            resolve: {
                job: resolve.job
            }
        });
    }
])

.controller('ApplyJobController', [
    '$scope',
    '$location',
    'Application',
    'job',
    function($scope, $location, Application, job) {

        //
        // Scope
        //
        $scope.job = job;
        $scope.application = new Application({
            blurb: ""
        });

        $scope.apply = apply;
        $scope.cancel = cancel;

        //
        // Functions
        //

        function apply() {
            $scope.application.$apply({job: job._id}).then(
                function() {
                    $location.url('/');
                },
                function() {
                    console.error('TODO');
                }
            );
        }

        function cancel() {
            $location.url('/job/' + job._id);
        }
    }
])