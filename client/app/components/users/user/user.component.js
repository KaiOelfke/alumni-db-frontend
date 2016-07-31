import template from './user.html';
import controller from './user.controller';
import './user.less';

let userComponent = {
  restrict: 'E',
  bindings: {user: '<', currentUser: '<'},
  template,
  controller
};

export default userComponent;
