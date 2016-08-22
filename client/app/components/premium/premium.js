import angular from 'angular';
import uiRouter from 'angular-ui-router';
import premiumComponent from './premium.component';

let premiumModule = angular.module('premium', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('userPanel.premium', {
      url: '/premium',
      component: 'userPanelPremium',
      onEnter: (AclService, $state, $auth) => {
        return $auth
            .validateUser()
            .then((user) => {
                AclService.detachRole('guest');
                
                if (user.statuses.indexOf("completedProfile") > -1) {
                  AclService.attachRole('registeredUser');
                } else {
                  AclService.attachRole('notRegisteredUser');
                }

                if (AclService.can('premium')) {
                    return true;
                }

                return $state.target('unauthorized');

            }, () => $state.target('unauthorized'));
      },
      resolve: {
        user: ($auth, $q) => {
          return $auth.validateUser().catch(() => $q.reject('unauthorized'));;
        }
      }      
    });
})

.component('userPanelPremium', premiumComponent)


.run(($transitions, $state) => {
  'ngInject';

  $transitions.onError({to: 'userPanel.premium'}, ($transition$, $error$) => {

    $transition$.promise.catch((error) => {
      if (error === 'unauthorized') {
        $state.go('unauthorized');
      } else {
        $state.go('notfound');
      }
    });

  });
})

.name;

export default premiumModule;
