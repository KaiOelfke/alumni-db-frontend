'use strict';

/**
 * @ngdoc function
<<<<<<< HEAD
 * @name alumni-db-frontend.controller:groupsCtrl
 * @description
 * # groupsCtrl
 * Controller of the alumni-db-frontend
 */

function groupsCtrl(groupsFactory, membershipsFactory,
                    usersFactory, $rootScope) {
    /*jshint validthis: true */
    /*jshint camelcase: false */
    var _this = this;
    var current_user = $rootScope.user;
    var _memberships = null;

    _this.isCollapsed = true;

    /* First get memberships of current user */
    usersFactory
        .getUserMemberships(current_user.id)
        .then(function (memberships) {
          _memberships = memberships.data.data;

          /* Then get all available groups */
          return groupsFactory.getGroups();
        })
        .then( function (groups) {

          /* For each group, check if user is member of it */
          _.each(groups.data, function (group) {

            /* _find iterates over a collection and returns the first 
             * element the predicate returns true for
             */
            group.membership = _.find(_memberships,
              function (membership) {
                return membership.group_id === group.id;
              });
          });

          console.log(groups.data);

          _this.groups = groups.data;

        })
        .catch( function (data, error) {
          console.log(data, error);
        });



/*
    groupsFactory.getGroups().success(function (data, err) {
        _this.groups = data;
        console.log(err, data, 'success');

        
    }).error(function (data, err) {
        console.log(err, data, 'error');
        
    });*/


    _this.addGroup = function (group) {
      groupsFactory.insertGroup(group).success(function  (data, err) {
         console.log(err, data, 'success');
      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });
    };

    _this.unsubscribe = function (membership) {
      

      var membershipId = membership.id;

      membershipsFactory.destoryMembership(membershipId).success(function  (data, err) {
         console.log(err, data, 'success');
      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });
    };


    _this.subscribe = function (group) {

      var membership = {group_id: group.id, user_id: current_user.id,
                        group_email_subscribed: true };
 
      membershipsFactory.insertMembership(membership).success(function  (data, err) {
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
  .controller('GroupsCtrl', ['groupsFactory', 'membershipsFactory',
                            'usersFactory', '$rootScope', groupsCtrl]);
