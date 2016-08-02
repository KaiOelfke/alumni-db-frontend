class ResetPasswordController {
  constructor($auth, $mdToast, AclService, $state) {
    'ngInject';
    this.$auth = $auth;
    this.$mdToast = $mdToast;
    this.AclService = AclService;
    this.$state = $state;
  }

  $onInit() {
    this.name = 'Reset Password';
    this.notQuering = true;
    this.resetPasswordForm = {
      email: '',
    };
  }

  resetPassword() {
    this.notQuering = false;
    this
      .$auth
      .requestPasswordReset(this.resetPasswordForm)
      .then((resp) => {
        this.notQuering = true;
        console.log(this.name, resp);
        this.$mdToast.show(this.$mdToast.simple()
                              .textContent('Check your email inbox.'));
      })
      .catch((err) => {
        this.notQuering = true;        
        console.log(this.name, err);        
        this.$mdToast.show(this.$mdToast.simple()
                              .highlightClass('md-warn')
                              .textContent('User not found.'));
      });
  }

}

export default ResetPasswordController;
