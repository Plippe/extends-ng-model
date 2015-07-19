angular.module('extendsNgModel').directive('ngModelLocation', function($location) {
  var link = function(scope, element, attributes, ngModelCtrl) {
    var searchKey = attributes.ngModelLocation || attributes.ngModel;
    var searchValue = function() { return $location.search()[searchKey]; }

    var updateSearchValue = function(ngModelValue) {
      $location.search(searchKey, ngModelValue);
      return ngModelValue;
    }

    var updateModelValue = function(searchValue) {
      var value = angular.isDefined(searchValue) ?
        searchValue :
        ngModelCtrl.$modelValue;

      ngModelCtrl.$setViewValue(value, this);
      ngModelCtrl.$render();
    }

    ngModelCtrl.$parsers.push(updateSearchValue);
    scope.$watch(searchValue, updateModelValue);
  }

  return {
    require: 'ngModel',
    restrict: 'A',
    link: link
  };
});