import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sideNavbarFactory from './side-navbar.factory';

let sideNavbarModule = angular.module('sideNavbar', [
  uiRouter
])

.factory('SideNavbar', sideNavbarFactory)
  
.name;

export default sideNavbarModule;
