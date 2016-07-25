import template from './signup.html';
import controller from './signup.controller';
import './signup.less';

let signupComponent = {
  restrict: 'E',
  bindings: {user: '<',
			 acl: '<'},
  template,
  controller
};

export default signupComponent;
