/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.foo', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'foo', {
    url: '/foo',
    views: {
      "main": {
        controller: 'FooCtrl',
        templateUrl: 'foo/foo.tpl.html'
      }
    },
    data:{ pageTitle: 'Foo' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'FooCtrl', function FooController( $scope ) {
  $scope.myName = 'Stephan';

  $scope.changeName = function(name) {
    $scope.myName = name;
  };
})

.service('fooService', function($http) {
  return {
    getUserComments: function(user) {

      return $http.get('http://api.reddit.com/user/' + user + '/submitted.json').then(function(response) {
        var posts, subreddits;

        posts = response.data.data.children;

        // transform data to be only subreddit strings
        subreddits = posts.map(function(post) {
          return post.data.subreddit;
        });
        
        // de-dupe
        subreddits = subreddits.filter(function(element, position) {
          return subreddits.indexOf(element) === position;
        });

        return subreddits;
      });

    }
  };
});

