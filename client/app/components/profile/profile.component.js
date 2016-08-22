import template from './profile.html';
import controller from './profile.controller';
import './profile.less';

let profileComponent = {
  restrict: 'E',
  bindings: {user: '<'},
  template,
  controller
};

export default profileComponent;
