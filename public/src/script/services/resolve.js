angular.module('scaffold').constant('resolve', {

    job: [
        'Job',
        '$route',
        function(Job, $route) {
            return Job.get({_id: $route.current.params.job}).$promise;
        }
    ],

    user: [
        'User',
        '$route',
        function(User, $route) {
            return User.get({_id: $route.current.params.user}).$promise;
        }
    ]
});