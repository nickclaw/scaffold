angular.module('scaffold', [
    'ngRoute',
    'ngMaterial',
    'ngResource'
])

.config([
    '$locationProvider',
    '$mdThemingProvider',
    function($locationProvider, $mdThemingProvider){
        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');

        //Extend the default palettes to include our branding colors
        var scaffoldBlueMap = $mdThemingProvider.extendPalette('blue', {
            '500': '009AB0'
        });
        $mdThemingProvider.definePalette('scaffoldBlue', scaffoldBlueMap);
        var scaffoldOrangeMap = $mdThemingProvider.extendPalette('orange', {
            '500': 'F7911E'
        });
        $mdThemingProvider.definePalette('scaffoldOrange', scaffoldOrangeMap);
        var scaffoldGreyMap = $mdThemingProvider.extendPalette('grey', {
            '500': '808080'
        });
        $mdThemingProvider.definePalette('scaffoldGrey', scaffoldGreyMap);

        $mdThemingProvider
            .theme('default')
            .warnPalette('scaffoldBlue')
            .accentPalette('scaffoldOrange')
            .primaryPalette('scaffoldGrey');
    }
])

.run([
    '$rootScope',
    '$mdSidenav',
    'profile',
    function($rootScope, $mdSidenav, profile) {
        $rootScope.profile = profile;

        $rootScope.toggleNav = function() {
           $mdSidenav('nav').toggle();
           
        };

        $rootScope.$on('$routeChangeStart', function() {
           $mdSidenav('nav').close();
        });
    }
]);
