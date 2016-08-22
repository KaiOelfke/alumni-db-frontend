import angular from 'angular';
import ProfileUtilitiesFactory from './profile-utilities.factory';

let profileUtilitiesModule = angular.module('profile-utilities', [])

.factory('ProfileUtilities', ProfileUtilitiesFactory)
  
.name;

export default profileUtilitiesModule;
