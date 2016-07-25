class SigninController {
  constructor($auth, $mdToast, validateUser) {
    'ngInject';
    this.$auth = $auth;
    this.$mdToast = $mdToast;
    this.notQuering = true;
    console.log(validateUser);
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
      .then((resp) => {
        this.notQuering = true;
        this.$mdToast.show(this.$mdToast.simple()
                              .textContent('Successfully logged in.'));
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
