class eventController {
  constructor(Events, Participations, Applications, Codes, $scope, $mdToast, $state) {
    'ngInject';

    this.name = 'event';
    this.events = Events;
    this.Participations = Participations;
    this.Applications = Applications;
    this.Codes = Codes;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.$scope = $scope;
  }

  $onInit() {

    const eventData = this.eventFees.event || this.eventFees;
    const feesData = this.eventFees.fees || {};
    console.log('feesData',feesData);
    this.eventTypes = this.events.eventTypes;
    eventData.logo_photo.url  = this.changeStartOfAvatarUrl(eventData.logo_photo.url);
    eventData.cover_photo.url  = this.changeStartOfAvatarUrl(eventData.cover_photo.url);

    this.cards = {
      event: {data: eventData, show: false},
      fees: {data: feesData, show: false},
      code: {data: {}, show: false},
      application: {data: {}, show: false},
      application_recived: {data: {}, show: false},
      participation: { data: {}, show: false},
      event_success: { data: {}, show: false},
      checkout: { data: {}, isLoading: false, show: false},
    }

    this.eventType = this.cards.event.data.etype;
    const applicationSent = !!(this.application); 

    if (this.eventType === 'with_payment' ||
        (this.eventType === 'with_application' && applicationSent) ||
        (this.eventType === 'with_payment_application' && applicationSent)) {
      this.cards.event.show = true;
      this.cards.code.show = true;
    } else {
      this.cards.event.show = true;
    }
  }

  // event card

  changeStartOfAvatarUrl (url) {
    if (!(url.indexOf('http://') === 0 ||
         url.indexOf('https://') === 0)) {
      return 'http://localhost:3000' + url;
    }     
    return url; 
  }

  showAttend() {
    return !this.participation || !!this.application;
  }

  attend() {
    this.cards.code.show = false;

    switch(this.cards.event.data.etype) {
      case 'without_application_payment':
        // attend participation api
        this.cards.event.show = false;
        this.cards.participation.show = true;
        break;

      case 'with_payment':
        // show payment and code
        // then checkout participation api
        this.cards.event.show = false;
        this.cards.participation.show = true;
        break;

      case 'with_application':
        // if applied show code
        // if not show application 
        // application or code
        this.cards.event.show = false;
        this.cards.application.show = true;
        break;

      case 'with_payment_application':
        // if applied show code
        // if not show application
        // application then fee and code
        // then checkout participation api
        this.cards.event.show = false;
        this.cards.application.show = true;
        break; 

    }
  }

  // participation card

  saveParticipation() {
    if (this.eventType === 'without_application_payment' ||
        this.eventType === 'with_application') {
      this.cards.participation.data.user_id = this.currentUser.id;
      this.cards.participation.data.event_id = this.cards.event.data.id;

      const newParticipation = new this.Participations
                                       .Resource({participation: this.cards.participation.data});
      newParticipation
        .$save({eventId: this.cards.event.data.id})
        .then((participation) => {
          this.cards.event_success.show = true;
          this.cards.participation.show = false;
        })
        .catch((error) => {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Failed: Couldn\'t participate')
              .position("top right")
              .hideDelay(4000)
          );
        });
    } else {
      this.cards.participation.show = false;
      this.cards.fees.show = true;
    }
  }

  // fees card
  setFee() {
    this.cards.checkout.show = true;
    this.cards.fees.show = false;

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

  feeSelectChanged(changedfee) {
    this.cards.fees.selected = changedfee;
    this.cards.fees.data.forEach((fee) => {
      if(fee.id !== changedfee.id) {
        fee.selected = false;
      }
    })
  }

  // application card

  uploadCV(file) {
    this.cards.application.data.cv_file = file;
  }

  sendApplication() {
    this.cards.application.data.user_id = this.currentUser.id;
    this.cards.application.data.event_id = this.cards.event.data.id;

    const newApplication = new this.Applications.Resource({application: this.cards.application.data});
    
    newApplication
      .$save({eventId: this.cards.event.data.id})
      .then(() => {
        this.cards.application.show = false;
        this.cards.application_recived.show = true;
      })
      .catch(() => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Faild: couldn\'t send the application to server.')
            .position("top right")
            .hideDelay(4000)
        );
      });
  }


  backToEvents() {
    this.$state.go('userPanel.Events');
  }

  // checkout

  braintreeOnReady(res) {
    this.cards.participation.isLoading = false;
    this.cards.participation.progressMsg = 'Enter your payment information.';
    this.cards.participation.status = 2;
    this.$scope.$digest();
    console.log(this, 'ready premium braintree',res);
  }

  braintreeOnPaymentMethodReceived(res) {
    this.cards.participation.isLoading = false;
    this.cards.participation.status = 3;
    this.cards.participation.progressMsg = 'Submit your payment.';
    this.cards.participation.data.payment_method_nonce = res.nonce;
    this.$scope.$digest();
  }


  braintreeOnError(err) {
    console.log('an error occurred');
    console.error(err);
  }

  submitPaymentDetails() {
    this.status = 1;    
    this.cards.participation.isLoading = true;
  }



  checkout() {
    this.cards.event_success.show = true;
    this.cards.checkout.show = false;
    this.cards.participation.data.user_id = this.currentUser.id;
    this.cards.participation.data.fee_id = this.cards.fee.selected.id;
    this.cards.participation.data.event_id = this.cards.event.data.id;
    if (this.cards.card.data.id) {
      this.cards.participation.data.fee_code_id = this.cards.card.data.id;  
    }
    
    const newParticipation = 
          new this.Participations
            .Resource({participation: this.cards.participation.data});

    newParticipation
      .$save({eventId: this.cards.event.data.id})
      .then((participation) => {
        this.cards.event_success.show = true;
        this.cards.participation.show = false;
      })
      .catch((error) => {

        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Failed: Couldn\'t participate')
            .position("top right")
            .hideDelay(4000)
        );

      });    
  }


  // code
  applyCode() {
    this.Codes.validateCode(
              this.cards.event.data.id,
              this.cards.card.card)
        .then((resp) => {
            const data = resp.data.data;
            if(data.valid) {
              this.cards.code.data.id = data.id;
              if (data.fee) {
                this.cards.fees.data.push(data.fee)
              }
              this.cards.participation.show = true;
              this.cards.code.show = false;
              this.cards.event.show = false;
            } else { 
              this.$mdToast.show(
                this.$mdToast.simple()
                  .textContent('Code isn\'t valid.')
                  .position("top right")
                  .hideDelay(4000)
              );
            }
        })
        .catch((error) => {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Failed: Couldn\'t reach the server')
              .position("top right")
              .hideDelay(4000)
          );
        })
  }


  showCard(cardName) {
    switch(cardName) {
      case 'event':
        return this.cards.event.show;
      case 'fees':
        return this.cards.fees.show;
      case 'code':
        return this.cards.code.show;
      case 'application':
        return this.cards.application.show;
      case 'application_recived':
        return this.cards.application_recived.show;
      case 'participation':
        return this.cards.participation.show;
      case 'checkout':
        return this.cards.checkout.show;
      case 'event_success':
        return this.cards.event_success.show
    }
  }




}

export default eventController;
