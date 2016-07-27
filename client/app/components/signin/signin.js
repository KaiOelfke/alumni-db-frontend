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
      component: 'signin',
      onEnter: (AclService, $state) => {
        if (AclService.can('signin')) {
            return true;
        }
        return $state.target('unauthorized');
      }
    });
})

.run(($rootScope, $state, AclService) => {
  "ngInject";

  $rootScope.$on('auth:login-error',
      (ev, reason ) => {
  });

  $rootScope.$on('auth:invalid',
      (ev) => {
  });

  $rootScope.$on('auth:validation-error',
      (ev) => {
  });

  $rootScope.$on('auth:validation-success',
      (ev, user) => {
  });

  $rootScope.$on('auth:login-success',
      (ev, user) => {

  });


})


.component('signin', signinComponent)

.name;

export default signinModule;
