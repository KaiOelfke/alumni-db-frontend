class ChangePasswordController {
  constructor($state, $auth, ProfileUtilities, $mdToast) {
    'ngInject';

    this.ProfileUtilities = ProfileUtilities;
    this.$auth = $auth;
    this.$state = $state;
    this.$mdToast = $mdToast;

  }

  $onInit() {
    this.changePasswordForm = {};
    this.notQuering = true;
  }

  cancelChangePassword() {
    this.$state.go('userPanel.profile');
  }

  changePassword() {
    this.notQuering = false;
    this.$auth
        .updatePassword(this.changePasswordForm)
        .then(() => {
      this.notQuering = true;

      this.$mdToast.show(
            this.$mdToast.simple()
                .textContent('Your Password changed successfully.'));
      this.$state.go('userPanel.profile');
    })
    .catch(() => {
        this.notQuering = true;
        this.$mdToast.show(
              this.$mdToast.simple()
                  .highlightClass('md-warn')
                  .textContent('Current Password is wrong!'));
    });
  }



}

export default ChangePasswordController;
