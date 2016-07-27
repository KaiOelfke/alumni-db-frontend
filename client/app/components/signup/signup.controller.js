class SignupController {
  constructor($auth, $mdToast, $rootScope) {
    "ngInject";
    this.$auth = $auth;
    this.$mdToast = $mdToast;
    this.notQuering = true;

    this.signupForm = {
      email: '',
      password: '',
      confirm_password: ''
    };
    console.log(this);
  }

  submitSignup() {
    this.notQuering = false;
    this.$auth
      .submitRegistration(this.signupForm)
      .then(function(resp) {
        this.notQuering = true;
        this.$mdToast.show(this.$mdToast.simple()
                      .textContent('Successfully signed up.'));
      })
      .catch(function(resp) {
        this.notQuering = true;
        this.$mdToast.show(this.$mdToast.simple()
                        .highlightClass('md-warn')
                        .textContent('Failed to signe up.'));
      });

  }
}




export default SignupController;
