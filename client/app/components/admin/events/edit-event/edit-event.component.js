import template from './edit-event.html';
import controller from './edit-event.controller';
import './edit-event.less';

let editEventComponent = {
  restrict: 'E',
  bindings: {event: '<'},
  template,
  controller
};

export default editEventComponent;
