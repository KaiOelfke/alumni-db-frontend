import template from './add-code.html';
import controller from './add-code.controller';

let addCodeComponent = {
  restrict: 'E',
  bindings: {currentEvent: '@'},
  template,
  controller
};

export default addCodeComponent;
