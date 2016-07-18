import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Signin from './signin/signin';
import Signup from './signup/signup';
import Registration from './registration/registration';
import Profile from './profile/profile';
import Permium from './premium/premium';
import Events from './events/events';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Signup,
  Signin,
  Registration,
  Profile,
  Permium,
  Events
])
  
.name;

export default componentModule;
