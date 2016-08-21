import template from './show-participation.html';
import controller from './show-participation.controller';
import './show-participation.less';

let showParticipationComponent = {
  restrict: 'E',
  bindings: {participation: '<'},
  template,
  controller
};

export default showParticipationComponent;
