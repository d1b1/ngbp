/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'foo section', function() {
  beforeEach( module( 'ngBoilerplate.foo' ) );

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  // Simple expect, noop.
  it( 'should have a dummy test', inject( function() {
    expect( true ).toBeTruthy();
  }));

  // Test that the scope value is set to a specific value in the controller.
  describe('$scope.myName', function() {
    it('sets the $scpe value for the variable myName', function() {
      var $scope = {};
      var controller = $controller('FooCtrl', { $scope: $scope });

      // Test the value in a given scope.
      expect($scope.myName).toEqual('Stephan');

      // Test a $scope function.
      $scope.changeName('Bart');

      expect($scope.myName).toEqual('Bart');
    });
  });

});

describe('foo service', function () {

  beforeEach( module( 'ngBoilerplate.foo' ) );

  var fooService, httpBackend;

  beforeEach(inject(function (_fooService_, $httpBackend) {
    fooService = _fooService_;
    httpBackend = $httpBackend;
  }));

  it('should do something', function () {

    // Reference: http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit

    // Setup the backend to to return data for a given user.
    httpBackend.whenGET('http://api.reddit.com/user/yoitsnate/submitted.json').respond({
        data: {
          children: [
            {
              data: {
                subreddit: 'golang'
              }
            },
            {
              data: {
                subreddit: 'javascript'
              }
            },
            {
              data: {
                subreddit: 'golang'
              }
            }
          ]
        }
    });

    fooService.getUserComments('yoitsnate').then(function( endpointData ) {

      // since the result returns an array, check that it got 
      // what it needed. 

      expect( endpointData ).toEqual(['golang', 'javascript']);

    });

    httpBackend.flush();
  });
});
