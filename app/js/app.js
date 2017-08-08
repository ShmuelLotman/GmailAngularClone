(function() {
  window.app = angular.module('nGmail', ['ngRoute', 'ngSanitize', 'ngResource']);
    app.run(function($rootScope, $location) {
        $rootScope.current_user = window.currentUser;
        $rootScope.isRouteActive = function() {
            for(var i=0; i<arguments.length; i++) {
                var arg=arguments[i];
                if(arg == $location.path()) { 
                    return true;
                }
            }
        }
    })
    app.config(function($routeProvider) {
        $routeProvider
         .when("/inbox", {
               templateUrl: 'partials/threads.html',
               activetab: 'inbox'
         })
         .when("/threads/:id", {
               templateUrl: 'partials/thread.html',
               activetab: 'inbox'
        })
        .when("/starred", {
               templateUrl: 'partials/starred.html',
               activetab: 'starred'
        })
         .when("/sent", {
               templateUrl: 'partials/sent.html',
               activetab: 'sent'
        })
         .when("/drafts", {
               templateUrl: 'partials/drafts.html',
               activetab: 'drafts'
        })
         .when("/trash", {
               templateUrl: 'partials/trash.html',
               activetab: 'trash'
        })
        .otherwise({
            redirectTo: '/inbox'
        })
    })

}).call(this);
