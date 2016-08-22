import template from './edit-profile.html';
import controller from './edit-profile.controller';
import './edit-profile.less';

let editProfileComponent = {
  restrict: 'E',
  bindings: {user: '<'},
  template,
  controller
};

export default editProfileComponent;
