import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signupComponent from './signup.component';

let signupModule = angular.module('signup', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  
  $stateProvider
    .state('signup', {
      url: '/signup',
      template: '<signup></signup>',
      resolve: {
        'acl' : ['$q', 'AclService', ($q, AclService) => {
          if(AclService.can('signup')){
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

.component('signup', signupComponent)
  
.name;

export default signupModule;
