import template from './change-password.html';
import controller from './change-password.controller';
import './change-password.less';

let changePasswordComponent = {
  restrict: 'E',
  bindings: {user: '<'},
  template,
  controller
};

export default changePasswordComponent;
