import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>',
      resolve: {
        'acl' : ['$q', 'AclService', ($q, AclService) => {
          if(AclService.can('registration')){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      },
    });
})

.component('home', homeComponent)
  
.name;

export default homeModule;
