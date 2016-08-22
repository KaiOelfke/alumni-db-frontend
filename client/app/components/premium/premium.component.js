import template from './premium.html';
import controller from './premium.controller';
import './premium.less';

let premiumComponent = {
  restrict: 'E',
  bindings: {user: '<'},
  template,
  controller
};

export default premiumComponent;
