import angular from 'angular';
import Home from './home/home';
import Signin from './signin/signin';
import Signup from './signup/signup';
import Registration from './registration/registration';
import Profile from './profile/profile';
import EditProfile from './profile/edit-profile/edit-profile';
import ChangePassword from './profile/change-password/change-password';
import Permium from './premium/premium';
import Events from './events/events';
import Event from './events/event/event';
import Unauthorized from './unauthorized/unauthorized';
import Notfound from './notfound/notfound';
import User from './users/user/user';
import Confirmation from './confirmation/confirmation';
import RestPassword from './reset-password/reset-password';

let componentModule = angular.module('app.components', [
  Home,
  Signup,
  Signin,
  Registration,
  Profile,
  EditProfile,
  Permium,
  Events,
  Event,
  Unauthorized,
  Notfound,
  User,
  ChangePassword,
  Confirmation,
  RestPassword
])
  
.name;

export default componentModule;
