import angular from 'angular';
import SearchFactory from './search.factory';

let searchModule = angular.module('search', [])

.factory('Search', SearchFactory)
  
.name;

export default searchModule;
