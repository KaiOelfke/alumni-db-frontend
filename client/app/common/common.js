import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import Logo from './logo/logo';
import ValidationMatch from './validation-match/validation-match';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
  Logo,
  ValidationMatch
])
  
.name;

export default commonModule;
