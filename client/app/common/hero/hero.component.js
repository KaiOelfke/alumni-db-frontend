import template from './hero.html';
import controller from './hero.controller';
import './hero.less';

let heroComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default heroComponent;
