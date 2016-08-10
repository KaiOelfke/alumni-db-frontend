import template from './edit-plan.html';
import controller from './edit-plan.controller';

let editPlanComponent = {
  restrict: 'E',
  bindings: {plan: '@'},
  template,
  controller
};

export default editPlanComponent;
