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
      component: 'registration',
      onEnter: (AclService, $state) => {
        if (AclService.can('registration')) {
            return true;
        }
        return $state.target('unauthorized');
      }
    });
})

.component('registration', registrationComponent)

.name;

export default registrationModule;
