import angular from 'angular';
// User Components
import UserPanel from './user-panel/user-panel';
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


// Admin Components
import AdminPanel from './admin-panel/admin-panel';
import AdminHome from './admin/home/home';
import AdminUsers from './admin/users/users';
import AdminSubscriptions from './admin/subscriptions/subscriptions';
import AdminEvents from './admin/events/events';

let componentModule = angular.module('app.components', [
  UserPanel,
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
  RestPassword,
  AdminPanel,
  AdminHome,
  AdminUsers,
  AdminSubscriptions,
  AdminEvents
])
  
.name;

export default componentModule;
