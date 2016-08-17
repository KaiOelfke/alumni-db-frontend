import template from './event.html';
import controller from './event.controller';
import './event.less';

let eventComponent = {
  restrict: 'E',
  bindings: {eventFees: '<'},
  template,
  controller
};

export default eventComponent;
