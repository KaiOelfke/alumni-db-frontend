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
        }]
      }
    });
})

.component('signin', signinComponent)
  
.name;

export default signinModule;
