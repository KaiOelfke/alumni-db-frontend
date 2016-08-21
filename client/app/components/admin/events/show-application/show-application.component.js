import template from './show-application.html';
import controller from './show-application.controller';
import './show-application.less';

let showApplicationComponent = {
  restrict: 'E',
  bindings: {application: '<'},
  template,
  controller
};

export default showApplicationComponent;
