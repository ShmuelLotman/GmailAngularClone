(function() {
 app.directive('stopEvent', function() {
     return {
     restrict: 'A',
     link: function(scope, element, attr) {
         element.bind('click', function(event) {
             event.preventDefault();
             event.stopPropagation();
         })
     }
     }
 })
app.directive('dropDown', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attr) {
            element.bind('click', function(event) {
                event.preventDefault();
                angular.element(this).toggleClass('active');
            })
        }
    }
})


}).call(this);
