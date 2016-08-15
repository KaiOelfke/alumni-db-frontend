import angular from 'angular';
import UsersFactory from './users.factory';
import SearchFactory from './search.factory';
import PremiumFactory from './premium.factory';
import PlansFactory from './plans.factory';
import DiscountsFactory from './discounts.factory';
import EventsFactory from './events.factory';
import FeesFactory from './fees.factory';
import CodesFactory from './codes.factory';
import ApplicationsFactory from './applications.factory';

let appApiModule = angular.module('appApi', [])

.factory('Users', UsersFactory)
 
.factory('Search', SearchFactory)

.factory('Premium', PremiumFactory)

.factory('Plans', PlansFactory)

.factory('Discounts', DiscountsFactory)

.factory('Fees', FeesFactory)

.factory('Codes', CodesFactory)

.factory('Applications', ApplicationsFactory)

.factory('Events', EventsFactory)

.name;

export default appApiModule;
