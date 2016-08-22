import angular from 'angular';
import PageLoadingFactory from './page-loading.factory';

let pageLoadingModule = angular.module('page-loading', [])

.factory('PageLoading', PageLoadingFactory)
  
.name;

export default pageLoadingModule;
