import angular from 'angular';
import ValidationMatchDirective from './validation-match.directive';

let validationMatchModule = angular.module('validation.match', [])

.directive('match', ValidationMatchDirective)
  
.name;

export default validationMatchModule;
