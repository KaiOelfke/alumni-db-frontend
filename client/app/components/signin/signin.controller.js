class SigninController {
  constructor($auth, $mdToast, AclService) {
    'ngInject';
    this.$auth = $auth;
    this.$mdToast = $mdToast;
  }

  $onInit() {
    this.notQuering = true;
    this.signinForm = {
      email: '',
      password: ''
    };
  }

  submitLogin() {
    this.notQuering = false;
    this
      .$auth
      .submitLogin(this.signinForm)
      .then((user) => {
        this.notQuering = true;
        this.$mdToast.show(this.$mdToast.simple()
                              .textContent('Successfully logged in.'));
        AclService.detachRole('guest');
        if (user.statuses.indexOf("completedProfile") > -1) {
          AclService.attachRole('registeredUser');
        } else {
          AclService.attachRole('notRegisteredUser');
          $state.go('registration');
        }
      })
      .catch((resp) => {
        this.notQuering = true;
        this.$mdToast.show(this.$mdToast.simple()
                              .highlightClass('md-warn')
                              .textContent('Failed to logging in!'));

      });
  }

}

export default SigninController;
