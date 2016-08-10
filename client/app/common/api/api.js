import angular from 'angular';
import UsersFactory from './users.factory';
import SearchFactory from './search.factory';
import PremiumFactory from './premium.factory';
import PlansFactory from './plans.factory';
import DiscountsFactory from './discounts.factory';

let appApiModule = angular.module('appApi', [])

.factory('Users', UsersFactory)
 
.factory('Search', SearchFactory)

.factory('Premium', PremiumFactory)

.factory('Plans', PlansFactory)

.factory('Discounts', DiscountsFactory)

.name;

export default appApiModule;
