import angular from 'angular';
import UsersFactory from './users.factory';

let usersModule = angular.module('users', [])

.factory('Users', UsersFactory)
  
.name;

export default usersModule;
