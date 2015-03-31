'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:groupsCtrl
 * @description
 * # groupsCtrl
 * Controller of the alumni-db-frontend
 */

function groupsCtrl(groupsFactory, memebershipsFactory, $rootScope) {
    /*jshint validthis: true */
    /*jshint camelcase: false */
    var _this = this;
    var current_user = $rootScope.user;

    _this.isCollapsed = true;

    groupsFactory.getGroups().success(function (data, err) {
        _this.groups = data;
        console.log(err, data, 'success');
    }).error(function (data, err) {
        console.log(err, data, 'error');
        
    });

    _this.addGroup = function (group) {
      groupsFactory.insertGroup(group).success(function  (data, err) {
         console.log(err, data, 'success');
      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });
    };

    _this.subscribe = function (group) {

      var membership = {group_id: group.id, user_id: current_user.id,
                        group_email_subscribed: false };
 
      memebershipsFactory.insertMembership(membership).success(function  (data, err) {
         console.log(err, data, 'success');
      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });
    };

    _this.delete = function (group) {
      groupsFactory.destoryGroup(group.id).success(function  (data, err) {
         console.log(err, data, 'success');
      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });
    };

    _this.edit = function () {
/*      groupsFactory.insertGroup(group).success(function  (data, err) {
         console.log(err, data, 'success');
      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });*/
    };


}


angular.module('alumni-db-frontend')
  .controller('GroupsCtrl', ['groupsFactory', 'memebershipsFactory', '$rootScope', groupsCtrl]);
