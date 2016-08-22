import template from './signup.html';
import controller from './signup.controller';
import './signup.less';

let signupComponent = {
  restrict: 'E',
  bindings: { acl: '<' },
  template,
  controller
};

export default signupComponent;
