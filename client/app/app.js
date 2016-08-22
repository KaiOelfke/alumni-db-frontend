import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import mdSteppers from 'material-steppers/dist/material-steppers.js';
import angularACL from 'angular-acl/angular-acl';
import ngTokenAuth from 'ng-token-auth';
import angularCookie from 'angular-cookie';
import ngMessages from 'angular-messages';
import moment from 'moment';
import angularMaterialDataTable from 'angular-material-data-table';
import ngResource from 'angular-resource';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import almuniConnectAPPConfig from './config';

import 'font-awesome/css/font-awesome.css'
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'material-steppers/dist/material-steppers.css';
import 'angular-material-data-table/dist/md-data-table.css';

angular.module('app', [
    ngMaterial,
    ngMessages,
    angularMaterialDataTable,
    ngResource,
    'mdSteppers',
    'mm.acl',
    'almuniConnectAPP.config',
    angularCookie,
    ngTokenAuth,
    uiRouter,
    Common,
    Components
  ])
  .config(($locationProvider, $stateProvider, APIHost, $urlRouterProvider, $mdThemingProvider, $authProvider, AclServiceProvider) => {
    "ngInject";

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('main', {
        url: '/',
        onEnter: ($auth, AclService, $state) => {          
          return $auth
              .validateUser()
              .then((user) => {
                return $state.target('userPanel.home');
              }, () => {
                return $state.target('signin');
              });
        }
      });

    const formatConvertar = (response) => {
      response = response.data;

      if (response.date_of_birth) {

        const dateOfBirth = moment(response.date_of_birth, "YYYY-MM-DD");

        response.date_of_birth = dateOfBirth.format("DD.MM.YYYY");
      }

      if (response.member_since) {
        const memberSince = moment(response.member_since, "YYYY-MM-DD");

        response.member_since = memberSince.format("DD.MM.YYYY");
      }

      


      const statuses = [];

      /*jshint camelcase: false */

      if (response.registered)
      {
        statuses.push('registered');
      }

      if (response.confirmed_email)
      {
        statuses.push('confirmedEmail');
      }

      if (response.completed_profile)
      {
        statuses.push('completedProfile');
      }

      if (response.is_super_user)
      {
        statuses.push('superUser');
      }

      if (response.is_premium)
      {
        statuses.push('premium');
      }

      response.statuses = statuses;
      return response;
    };

    $authProvider.configure({
      apiUrl: APIHost,
      accountUpdatePath: '/users',
      storage: 'localStorage',
      confirmationSuccessUrl: window.location.origin + '/profile/email-confirmation',
      passwordResetSuccessUrl: window.location.origin + '/profile/change-password',
      handleLoginResponse: formatConvertar,
      handleAccountUpdateResponse: formatConvertar,
      handleTokenValidationResponse: formatConvertar,
      passwordResetPath: '/auth/password/',
      passwordUpdatePath: '/auth/password/',
      validateOnPageLoad: false,
    });


    const aclConfig = {
      storage: 'localStorage',
      storageKey: 'AlumniConnectAcl'
    };

    AclServiceProvider.config(aclConfig);

    $mdThemingProvider.definePalette('whitepalette', {
      '50': '212121',
      '100': '424242',
      '200': '616161',
      '300': '757575',
      '400': '9E9E9E',
      '500': 'BDBDBD',
      '600': 'E0E0E0',
      '700': 'EEEEEE',
      '800': 'F5F5F5',
      '900': 'FAFAFA',
      'A100': 'ffffff',
      'A200': 'ffffff',
      'A400': 'ffffff',
      'A700': 'ffffff',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100',
        '200', '300', '400', 'A100'],
      'contrastLightColors': undefined
    });


    $mdThemingProvider.theme('event-dark')
      .primaryPalette('amber')
      .accentPalette('grey')
      .dark();  

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('grey');


    $mdThemingProvider.theme('navDark')
      .primaryPalette('grey')
      .accentPalette('grey');

    $mdThemingProvider.theme('nav')
      .primaryPalette('whitepalette')
      .accentPalette('whitepalette');


    $mdThemingProvider.theme('events')
      .primaryPalette('amber')
      .accentPalette('grey');

    $mdThemingProvider.theme('premium')
      .primaryPalette('deep-orange')
      .accentPalette('grey');

    $mdThemingProvider.theme('profile')
      .primaryPalette('light-green')
      .accentPalette('grey');


    $mdThemingProvider.theme('home')
      .primaryPalette('blue')
      .accentPalette('grey');

  })

  .run((AclService, $rootScope, $state, $mdToast, $transitions) => {
    "ngInject";
    const aclData = {
      guest: ['signin', 'signup', 'reset-password'],
      notRegisteredUser: ['logout', 'registration'],
      registeredUser: ['logout', 'premium', 'home',
                       'events', 'event', 'profile',
                       'change-password', 'edit-profile',
                       'showUser'],
      premium: ['enter-event']
    }
    AclService.attachRole('guest');
    AclService.setAbilities(aclData);


  })

  .component('app', AppComponent);
