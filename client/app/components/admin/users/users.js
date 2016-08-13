import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import showUserComponent from './show-user/show-user.component';
import editUserComponent from './edit-user/edit-user.component';

let usersModule = angular.module('adminPanelUsers', [
  uiRouter
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('adminPanel.Users', {
      url: '/users',
      component: 'adminPanelUsers',
    })
    .state('adminPanel.UsersShowUser', {
      url: '/users/:id',
      component: 'adminPanelUsersShowUser',
      resolve: {
        user: (Users, $stateParams, $q) => {
          return Users.getUser($stateParams.id)
                      .then((resp) => resp.data.data,
                            () => $q.reject('notfound'));
        }
      }
    });  
})

.component('adminPanelUsers', usersComponent)

.component('adminPanelUsersShowUser', showUserComponent)

.component('adminPanelUsersEditUser', editUserComponent)

.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError(
    {to: 'adminPanel.Users*'},
    ($transition$, $error$) => {
      $transition$.promise.catch((error) => {
          $state.go('notfound');
      });
  });
})

.name;

export default usersModule;
