import template from './add-fee.html';
import controller from './add-fee.controller';

let addFeeComponent = {
  restrict: 'E',
  bindings: {eventId: '@'},
  template,
  controller
};

export default addFeeComponent;
