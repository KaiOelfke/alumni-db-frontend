import template from './events.html';
import controller from './events.controller';
import './events.less';

let eventsComponent = {
  restrict: 'E',
  bindings: {events: '<'},
  template,
  controller
};

export default eventsComponent;
