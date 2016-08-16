import template from './add-code.html';
import controller from './add-code.controller';

let addCodeComponent = {
  restrict: 'E',
  bindings: {eventId: '@'},
  template,
  controller
};

export default addCodeComponent;
