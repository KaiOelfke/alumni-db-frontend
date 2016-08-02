import angular from 'angular';
import PremiumFactory from './premium.factory';
import PlansFactory from './plans.factory';

let premiumModule = angular.module('premiumUtilities', [])

.factory('Premium', PremiumFactory)

.factory('Plans', PlansFactory)

  
.name;

export default premiumModule;
