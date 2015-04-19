'use strict';

/**
 * @ngdoc function
 * @name alumni-db-frontend.controller:groupCtrl
 * @description
 * # groupCtrl
 * Controller of the alumni-db-frontend
 */

function groupCtrl(groupsFactory, membershipsFactory,
                    usersFactory, avatarFactory, toaster, $rootScope, $stateParams, $modal) {
    /*jshint validthis: true */
    /*jshint camelcase: false */
    var _this = this;
    var current_user = $rootScope.user;
    _this.isSuperUser = $rootScope.isSuperUser();

    _this.isCollapsed = true;
    _this.users = null;
    _this.userMembership = null;
    _this.group = {};
    _this.uploadingStatus = undefined;

    groupsFactory
        .getGroup($stateParams.id)
        .success(function (data, error) {
          _this.group = data;
          console.log(data, error);
        }).error(function (data, error) {
          console.log(data, error);
        });

    groupsFactory
        .getUsers($stateParams.id)
        .then(function (users) {
          _this.users = users.data;
          _this.userMembership = _.find(users.data, function  (user) {
            return user.user.id === current_user.id;
          });
          _this.userMembership = _this.userMembership ? _this.userMembership.membership : false;

          console.log(_this.users, _this.userMembership);
        })
        .catch( function (data, error) {
          console.log(data, error);
        });



    _this.fileSelected = function (files) {
      avatarFactory.uploadPicture(files, _this.group.id).then(function (data) {
        _this.group.picture = data.data.picture;
        _this.uploadingStatus = undefined;
      }, function () {
        _this.uploadingStatus = undefined;
        toaster.error('Something went wrong');
      }, function (progress) {
        _this.uploadingStatus = 'uploading: '+ progress + '%';
      });
    };


    _this.getPicture = avatarFactory.getGroupPicture;

    _this.unsubscribe = function (membership) {


      var membershipId = membership.id;

      membershipsFactory.destoryMembership(membershipId).success(function  (data, err) {
         console.log(err, data, 'success');
         if (_this.userMembership.id === membership.id) {
          _this.userMembership = null;
         }

      }).error(function  (data, err) {
         console.log(err, data, 'error');
      });
    };


    _this.subscribe = function () {

      var membership = {group_id: $stateParams.id, user_id: current_user.id,
                        group_email_subscribed: true };


      membershipsFactory.insertMembership(membership).success(function  (data, err) {
        console.log(err, data, 'success');
        _this.userMembership = data.data;

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


    _this.openEditGroup = function () {
      console.log('openEditGroup');

      var modalInstance = $modal.open({
        templateUrl: 'editGroup.html',
        controller: 'GroupEditCtrl',
        size: '',
        resolve: {
          group: function () {
            return groupsFactory.getGroup($stateParams.id);
          }
        }
      });

      modalInstance.result.then(function (group) {
        _this.group = group;
      }, function () {

      });
    };

    _this.openEditMembership = function (membership) {
      console.log('openEditMembership', membership);

      var modalInstance = $modal.open({
        templateUrl: 'editMembership.html',
        controller: 'MembershipEditCtrl',
        size: '',
        resolve: {
          membership: function () {
            return membership;
          }
        }
      });

      modalInstance.result.then(function (new_membership) {
        membership = new_membership;
      }, function () {

      });
    };
}


angular.module('alumni-db-frontend')
  .controller('GroupCtrl', ['groupsFactory', 'membershipsFactory',
                            'usersFactory', 'avatarFactory', 'toaster', '$rootScope', '$stateParams', '$modal', groupCtrl]);


function editGroupCtrl (groupsFactory, $modalInstance, group, $scope) {
  $scope.group = group.data;

  $scope.ok = function () {
    groupsFactory
        .editGroup(group.data.id,$scope.group)
        .success(function (data, error) {

          $modalInstance.close(data.data);
          console.log(error, data, 'success');
        }).error(function (data, error) {
          console.log(error, data, 'error');
        });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}


angular.module('alumni-db-frontend')
  .controller('GroupEditCtrl', ['groupsFactory','$modalInstance','group','$scope', editGroupCtrl]);


function membershipEditCtrl (membershipsFactory, $modalInstance, membership, $rootScope, $scope) {
  $scope.membership = membership;
  $scope.isSuperUser = $rootScope.isSuperUser;

  console.log(membership);
  $scope.ok = function () {

    console.log('adasd',$scope.membership);

    membershipsFactory
        .editMembership(membership.id,$scope.membership)
        .success(function (data, error) {

          $modalInstance.close(data.data);
          console.log(error, data, 'success');
        }).error(function (data, error) {
          console.log(error, data, 'error');
        });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}


angular.module('alumni-db-frontend')
  .controller('MembershipEditCtrl', ['membershipsFactory','$modalInstance','membership',
                                      '$rootScope', '$scope', membershipEditCtrl]);



