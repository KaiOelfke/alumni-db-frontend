import template from './show-user.html';
import controller from './show-user.controller';
import './show-user.less';

let showUserComponent = {
  restrict: 'E',
  bindings: {user: '<'},
  template,
  controller
};

export default showUserComponent;
