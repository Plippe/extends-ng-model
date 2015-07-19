describe('ngModelLocation', function(){

  beforeEach(module('extendsNgModel'));

  var compile, location;
  beforeEach(inject(function($injector){
    compile = $injector.get('$compile');
    location = $injector.get('$location');
    scope = $injector.get('$rootScope');
  }));

  it('should not change model, nor view if search is undefined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();
    expect(scope.text).toBe('hello world');
    expect(element.val()).toBe('hello world');
  }));

  it('should change model, and view if search is defined', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';
    location.search('text', 'new value');

    scope.$digest();
    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and view if search changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    location.search('text', 'new value');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(element.val()).toBe('new value');
  }));

  it('should change model, and search if view changes', inject(function() {
    var element = compile('<input ng-model="text" ng-model-location="" />')(scope);
    scope.text = 'hello world';

    scope.$digest();

    element.val('new value');
    element.triggerHandler('change');
    scope.$digest();

    expect(scope.text).toBe('new value');
    expect(location.search().text).toBe('new value');
  }));

  it('should behave the same with numbers', inject(function() {
    var element = compile('<input type="number" ng-model="number" ng-model-location="" />')(scope);
    scope.number = 123.45;

    scope.$digest();
    expect(scope.number).toBe(123.45);
    expect(element.val()).toBe('123.45');

    location.search('number', 67);
    scope.$digest();
    expect(scope.number).toBe(67);
    expect(element.val()).toBe('67');

    element.val('8.90');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.number).toBe(8.90);
    expect(location.search().number).toBe(8.90);
  }));

  it('should behave the same with checkboxes', inject(function() {
    var element = compile('<input type="checkbox" ng-model="checkbox" ng-model-location="" />')(scope);
    scope.checkbox = true;

    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(element.attr('checked')).toBeTruthy();

    location.search('checkbox', false);
    scope.$digest();
    expect(scope.checkbox).toBeFalsy();
    expect(element.attr('checked')).toBeFalsy();

    element.attr('checked', 'checked');
    element.triggerHandler('click');
    scope.$digest();
    expect(scope.checkbox).toBeTruthy();
    expect(location.search().checkbox).toBeTruthy();
  }));

  it('should behave the same with dates', inject(function() {
    var element = compile('<input type="date" ng-model="date" ng-model-location="" />')(scope);
    scope.date = new Date('2000-01-01');

    scope.$digest();
    expect(scope.date).toEqual(new Date('2000-01-01'));
    expect(element.val()).toBe('2000-01-01');

    location.search('date', '2001-01-01');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2001-01-01'));
    expect(element.val()).toBe('2001-01-01');

    element.val('2002-01-01');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.date).toEqual(new Date('2002-01-01'));
    expect(location.search().date).toBe('2002-01-01');
  }));

  it('should behave the same with emails', inject(function() {
    var element = compile('<input type="email" ng-model="email" ng-model-location="" />')(scope);
    scope.email = 'ab@cd.ef';

    scope.$digest();
    expect(scope.email).toBe('ab@cd.ef');
    expect(element.val()).toBe('ab@cd.ef');

    location.search('email', 'cb@ef.ab');
    scope.$digest();
    expect(scope.email).toBe('cb@ef.ab');
    expect(element.val()).toBe('cb@ef.ab');

    element.val('ef@ab.cd');
    element.triggerHandler('change');
    scope.$digest();
    expect(scope.email).toBe('ef@ab.cd');
    expect(location.search().email).toBe('ef@ab.cd');
  }));

});
