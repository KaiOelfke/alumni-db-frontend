'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.service:plansFactory
 * @description
 * # plansFactory
 * Factory of the alumni-db-frontend
 */
angular.module('alumni-db-frontend')
  .factory('plansFactory', ['$http', 'API_HOST', function($http, API_HOST) {
    var urlBase = API_HOST + '/subscriptions/plans';
    var plansFactory = {};

    plansFactory.insertPlan = function(plan) {
      return $http.post(urlBase, {
        plan: plan,
      });
    };

    plansFactory.destoryPlan = function(id) {
      return $http.delete(urlBase + '/' + id);
    };

    plansFactory.editPlan = function(id, plan) {
      return $http.put(urlBase + '/' + id, {
        plan: plan,
      });
    };

    plansFactory.getPlan = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    plansFactory.getAllPlans = function() {
      return $http.get(urlBase);
    };

    return plansFactory;
  }]);
