import angular from 'angular';
import uiRouter from 'angular-ui-router';
import moment from 'moment';
import registrationComponent from './registration.component';

let registrationModule = angular.module('registration', [
  uiRouter
])

.config(($stateProvider, $mdDateLocaleProvider) => {
  "ngInject";

  $mdDateLocaleProvider.formatDate = function(date) {
    const m = moment(date, "DD.MM.YYYY");
    return m.isValid() ?  m.format('DD.MM.YYYY'): null;
  };
  
  $mdDateLocaleProvider.longDateFormatter = function(date) {
    const m = moment(date, "DD.MM.YYYY");
    return (date != null && m.isValid()) ?  m.format('DD.MM.YYYY'): null;
  };
  


  $stateProvider
    .state('registration', {
      url: '/registration',
      template: '<registration></registration>',
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
      }      
    });
})

.component('registration', registrationComponent)
  
.name;

export default registrationModule;
