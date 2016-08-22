import braintree from 'braintree-web';

class PremiumController {
  constructor(Premium, Plans, $scope, $mdToast) {
    'ngInject';
    this.Premium = Premium;
    this.$scope = $scope;
    this.$mdToast = $mdToast;
    this.Plans = Plans;
  }

  $onInit() {
    this.name = 'premium';
    this.payProcess = false;
    this.notProcessing = false;
    this.progressMsg = '';
    this.statusMsg = '';
    this.status = 1;
    this.paymentData = {
      payment_method_nonce: null,
      user_id: this.user.id,
    }; 
    this.benefits = [];
    for (let i = 0; i < 5; i++) {
      this.benefits.push({
        content: `Reason Number: ${i}`,
      });
    }
  }

  braintreeOnReady(res) {
    this.notProcessing = true;
    this.progressMsg = 'Enter your payment information.';
    this.status = 2;
    this.$scope.$digest();
    console.log(this, 'ready premium braintree',res);
  }

  braintreeOnPaymentMethodReceived(res) {
    this.notProcessing = true;
    this.status = 3;
    this.progressMsg = 'Submit your payment.';
    this.paymentData.payment_method_nonce = res.nonce;
    this.$scope.$digest();
  }


  braintreeOnError(err) {
    console.log('an error occurred');
    console.error(err);
  }

  becomePremiumUser() {
    this.payProcess = true;
    this.progressMsg = 'Loading ...';
    this.notProcessing = false;
    const self = this;

    this.Premium.getClientToken()
        .then((clientToken) => { 
          braintree.setup(
                clientToken,
                'dropin',
                {
                container: 'payment-form',
                onPaymentMethodReceived: self.braintreeOnPaymentMethodReceived.bind(self),
                onReady: self.braintreeOnReady.bind(self),
                onError: self.braintreeOnError.bind(self),
              });

        })
        .catch((err) => {
          this.status = 0;
          this.status = 'couldn\'t reach the server, try later :('; 
        });
  }

  submitPaymentDetails() {
    this.status = 1;    
    this.notProcessing = false;
  }

  submitPayment() {
    this.Premium
        .subscribe(this.paymentData)
        .then((resp) => {
          console.log(this.name, 'submitPayment', resp);
          this.user.is_premium = true;
          this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Now, you are a premium user!'));

        })
        .catch(() => { 
          this.$mdToast.show(
                this.$mdToast.simple()
                    .highlightClass('md-warn')
                    .textContent('Couldn\'t submit your payment!'));

        })
  }


}

export default PremiumController;
