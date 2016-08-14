import template from './show-event.html';
import controller from './show-event.controller';
import './show-event.less';

let showEventComponent = {
  restrict: 'E',
  bindings: {event: '<'},
  template,
  controller
};

export default showEventComponent;
