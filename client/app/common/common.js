import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import Logo from './logo/logo';
import ValidationMatch from './validation-match/validation-match';
import Search from './search/search';
import Users from './users/users';
import ProfileUtilities from './profile-utilities/profile-utilities';
import Premium from './premium/premium';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
  Logo,
  ValidationMatch,
  Users,
  Search,
  ProfileUtilities,
  Premium
])
  
.name;

export default commonModule;
