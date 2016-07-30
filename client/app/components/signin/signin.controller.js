class SigninController {
  constructor($auth, $mdToast, AclService, $state) {
    'ngInject';
    this.$auth = $auth;
    this.$mdToast = $mdToast;
    this.AclService = AclService;
    this.$state = $state;
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
        this.AclService.detachRole('guest');
        console.log('signin', user);
        if (user.statuses.indexOf("completedProfile") > -1) {
          this.AclService.attachRole('registeredUser');
          this.$state.go('home');
        } else {
          this.AclService.attachRole('notRegisteredUser');
          this.$state.go('registration');
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
