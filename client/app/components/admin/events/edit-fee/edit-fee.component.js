import template from './edit-fee.html';
import controller from './edit-fee.controller';

let editFeeComponent = {
  restrict: 'E',
  bindings: {eventId: '@', currentFee: '@'},
  template,
  controller
};

export default editFeeComponent;
