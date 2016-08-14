class EditEventController {
  constructor (Users, Premium, $mdToast) {
    'ngInject';
    this.premium = Premium;
    this.$mdToast = $mdToast;
  }

  $onInit() {
    this.user.fullname = `${this.capitalizeFirstLetter(this.user.first_name)} 
                          ${this.capitalizeFirstLetter(this.user.last_name)}`;
    if (!(this.user.avatar.url.indexOf('http://') == 0 ||
        this.user.avatar.url.indexOf('https://') == 0)) {
      this.user.avatar.url = 'http://localhost:3000'+ this.user.avatar.url;
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  makePremium() {
    this.premium
        .subscribe({user_id: this.user.id})
        .then((resp) => {
          this.user.subscription_id = resp.data.subscription_id;
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Success: ${this.user.fullname} became a premium user`));
        })
        .catch(() => {
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Failed: Server Error`));
        });
  }

  removePremium() {
    this.premium
        .destroySubscription(this.user.subscription_id)
        .then(() => {
          this.user.subscription_id = null;
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Success: ${this.user.fullname} became a normal user`));
        })
        .catch(() => {
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(`Failed: Server Error`));
        }); 
  }

}

export default EditEventController;
