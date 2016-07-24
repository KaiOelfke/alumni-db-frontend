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
  .config(($locationProvider, $mdThemingProvider, AclServiceProvider) => {
    "ngInject";

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

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

  .run((AclService, $rootScope, $state) => {
    "ngInject";

    const aclData = {
      guest: ['signin', 'signup', 'registration'],
      notRegisteredUser: ['logout', 'registration'],
      registeredUser: ['logout', 'home']
    }
    
    AclService.setAbilities(aclData);
    AclService.attachRole('guest');

    $rootScope.$on('$stateChangeError', (event, toState, toParams,
                                         fromState, fromParams, rejection) => {
      if (rejection === 'Unauthorized') {
        $state.go('unauthorized');
      } else {
        $state.go('404');        
      }
    });


    // listen to ng-token-auth and change roles corresponding to current user


  
  })

  .component('app', AppComponent);