class ConfirmationController {
  constructor(AclService, $rootScope, $auth, $location) {
    'ngInject';

    this.AclService = AclService;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$location = $location;

  }

  $onInit() {
    this.AclService.flushRoles();    
    this.status = '';
    this.statusCode = '';
    this.loading = true;
    this.can = this.AclService.can;
    this.param = this.$location.search();

    if (this.param.account_confirmation_success) {
      this.$auth
          .validateUser();

      this.$rootScope.$on('auth:email-confirmation-success',
        (ev, user) => {
          this.loading = false;
          this.AclService.flushRoles();

          if (user.statuses.indexOf("completedProfile") > -1) {
            this.AclService.attachRole('registeredUser');
          }
          this.statusCode = ':)';
          this.status = 'You have confirmed your email.';
      });

      this.$rootScope.$on('auth:email-confirmation-error',
        (ev, reason) => {
          console.log(ev, reason);
          this.loading = false;
          this.status = 'We couldn\'t  confirm your email.';
          this.statusCode = ':(';
          this.AclService.flushRoles();
          this.AclService.attachRole('guest');
      });

    } else {
      this.loading = false;
      this.status = 'We couldn\'t  confirm your email.';
      this.statusCode = ':(';
    }
  
  }




}

export default ConfirmationController;
