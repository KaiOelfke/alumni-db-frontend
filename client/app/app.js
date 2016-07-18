import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from "angular-material";
import mdSteppers from "md-steppers/dist/md-steppers";
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'md-steppers/dist/md-steppers.css';

angular.module('app', [
    ngMaterial,
    'md-steppers',
    uiRouter,
    Common,
    Components
  ])
  .config(($locationProvider, $mdThemingProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

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
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
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

  .component('app', AppComponent);
