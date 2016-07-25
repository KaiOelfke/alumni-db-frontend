import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signinComponent from './signin.component';

let signinModule = angular.module('signin', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";


  $stateProvider
    .state('signin', {
      url: '/signin',
      template: '<signin></signin>',
      resolve: {
        'acl' : ['$q', 'AclService', ($q, AclService) => {
          if(AclService.can('signin')){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }],
        validateUser: ['$auth', ($auth) => {
          return $auth.validateUser();
        }]
      }
    });
})

.run(($rootScope, $state, AclService) => {
  "ngInject";

  $rootScope.$on('auth:login-error',
      (ev, reason ) => {
      //console.log('auth failed because', reason.errors[0]);
  });

  $rootScope.$on('auth:invalid',
      (ev) => {
    AclService.attachRole('guest');
  });

  $rootScope.$on('auth:validation-error',
      (ev) => {
    AclService.attachRole('guest');
  });


  $rootScope.$on('auth:validation-success',
      (ev, user) => {
        AclService.detachRole('guest');
        console.log('1231231', user);
      if (user.statuses.indexOf("completedProfile") > -1) {
        console.log('213', user);

        AclService.attachRole('registeredUser');
      } else {
        console.log('213123123', user);

        AclService.attachRole('notRegisteredUser');

        $state.go('registration');
      }
  });

  // if the user hasn't completed his profile
  // he should be redirected to registration state
  $rootScope.$on('auth:login-success',
      (ev, user) => {
        AclService.detachRole('guest');

      if (user.statuses.indexOf("completedProfile") > -1) {
        AclService.attachRole('registeredUser');

        $state.go('home');
      } else {
        AclService.attachRole('notRegisteredUser');


        $state.go('registration');
      }
  });


})


.component('signin', signinComponent)
  
.name;

export default signinModule;
