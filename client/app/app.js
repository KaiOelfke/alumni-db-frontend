import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from "angular-material";
import mdSteppers from "material-steppers/dist/material-steppers.js";
import angularACL from "angular-acl/angular-acl";
import ngTokenAuth from "ng-token-auth";
import braintree from "braintree-web";
import angularCookie from "angular-cookie";
import ngMessages from "angular-messages";

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'material-steppers/dist/material-steppers.css';

angular.module('app', [
    ngMaterial,
    ngMessages,
    'mdSteppers',
    'mm.acl',
    angularCookie,
    ngTokenAuth,
    uiRouter,
    Common,
    Components
  ])
  .config(($locationProvider, $urlRouterProvider, $mdThemingProvider, $authProvider, AclServiceProvider) => {
    "ngInject";

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    const formatConvertar = (response) => {
      response = response.data;
      var statuses = [];

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
      apiUrl: 'http://localhost:3000',
      accountUpdatePath: '/users',
      storage: 'localStorage',
      passwordResetSuccessUrl: window.location.origin + '/#/password-update',
      handleLoginResponse: formatConvertar,
      handleAccountUpdateResponse: formatConvertar,
      handleTokenValidationResponse: formatConvertar,
      passwordResetPath: '/auth/password/',
      passwordUpdatePath: '/auth/password/'
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

  .run((AclService, $rootScope, $state, $mdToast) => {
    "ngInject";
    const aclData = {
      guest: ['signin', 'signup'],
      notRegisteredUser: ['logout', 'registration'],
      registeredUser: ['logout', 'home'],
      premium: ['home', 'events', 'event']
    }
    AclService.attachRole('guest');
    AclService.setAbilities(aclData);
  })

  .component('app', AppComponent);
