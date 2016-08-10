import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import Logo from './logo/logo';
import ValidationMatch from './validation-match/validation-match';
import Api from './api/api';
import ProfileUtilities from './profile-utilities/profile-utilities';
import SideNavbar from './side-navbar/side-navbar';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  Logo,
  ValidationMatch,
  ProfileUtilities,
  SideNavbar,
  Api
])
  
.name;

export default commonModule;
