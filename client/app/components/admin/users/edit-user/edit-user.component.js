import template from './edit-user.html';
import controller from './edit-user.controller';
import './edit-user.less';

let editUserComponent = {
  restrict: 'E',
  bindings: {user: '<'},
  template,
  controller
};

export default editUserComponent;
