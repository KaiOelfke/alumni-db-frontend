import braintree from 'braintree-web';

class eventController {
  constructor(Events, Participations, Premium, Applications, Codes, $scope, $mdToast, $state) {
    'ngInject';

    this.name = 'event';
    this.events = Events;
    this.Participations = Participations;
    this.Applications = Applications;
    this.Codes = Codes;
    this.Premium = Premium;
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.$scope = $scope;
  }

  $onInit() {

    const eventData = this.eventFees.event || this.eventFees;
    const feesData = this.eventFees.fees || {};

    this.eventTypes = this.events.eventTypes;
    eventData.logo_photo.url  = this.changeStartOfAvatarUrl(eventData.logo_photo.url);
    eventData.cover_photo.url  = this.changeStartOfAvatarUrl(eventData.cover_photo.url);

    this.cards = {
      status: {message: {}, show: false},
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

    if (applicationSent) {
      this.cards.status.show = true;
      this.cards.status.message = 'Your application is send. If you recived a code enter it to complete your registration.';
    }

    if (!!this.participation) {
      this.cards.status.show = true;
      this.cards.status.message = 'You are registered in this event';
    }


    if (this.eventType === 'with_payment' && !!!this.participation ||
        (this.eventType === 'with_application' &&
          applicationSent && !!!this.participation) ||
        (this.eventType === 'with_payment_application' &&
          applicationSent  && !!!this.participation)) {
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
    return !(!!this.participation || !!this.application);
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
      this.cards.participation.data.fee_code_id = this.cards.code.data.id;

      const newParticipation = new this.Participations
                                       .Resource({code: this.cards.code.data.code,
                                                  participation: this.cards.participation.data});
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

    this.cards.checkout.isLoading = true;
    this.cards.checkout.progressMsg = 'Loading ...';
    this.cards.checkout.status = 1;

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
          this.cards.checkout.status = 0;
          this.cards.checkout.progressMsg = 'couldn\'t reach the server, try later :('; 
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

    console.log(file);
    this.cards.application.data.cv_file = file;
  }

  sendApplication() {
    this.cards.application.data.user_id = this.currentUser.id;
    this.cards.application.data.event_id = this.cards.event.data.id;
    this.cards.application.isLoading = true;
    this.Applications
        .createApplication(this.cards.event.data.id, this.cards.application.data)
        .then( (resp) => {
            this.cards.application.isLoading = false;
            this.cards.application.show = false;
            this.cards.application_recived.show = true;
            console.log('Success ',resp);
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        },  (resp) => {
            this.cards.application.isLoading = false;      
            console.log('Error status: ' + resp);
        },  (evt)  =>{
            console.log('progress ' , evt);          
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });      
  }


  backToEvents() {
    this.$state.go('userPanel.Events');
  }

  // checkout

  braintreeOnReady(res) {
    this.cards.checkout.isLoading = false;
    this.cards.checkout.progressMsg = 'Enter your payment information.';
    this.cards.checkout.status = 2;
    this.$scope.$digest();
    console.log(this, 'ready premium braintree',res);
  }

  braintreeOnPaymentMethodReceived(res) {
    this.cards.checkout.isLoading = false;
    this.cards.checkout.status = 3;
    this.cards.checkout.progressMsg = 'Submit your payment.';
    this.cards.checkout.data.payment_method_nonce = res.nonce;
    this.$scope.$digest();
  }


  braintreeOnError(err) {
    console.log('an error occurred');
    console.error(err);
  }

  submitPaymentDetails() {
    this.cards.checkout.status = 1;    
    this.cards.checkout.isLoading = true;
  }



  checkout() {
    this.cards.participation.data.user_id = this.currentUser.id;
    this.cards.participation.data.fee_id = this.cards.fees.selected.id;
    this.cards.participation.data.fee_code_id = this.cards.code.data.id;
    this.cards.participation.data.event_id = this.cards.event.data.id;
    this.cards.participation.data.payment_method_nonce = 
      this.cards.checkout.data.payment_method_nonce;
    if (this.cards.code.data.id) {
      this.cards.participation.data.fee_code_id = this.cards.code.data.id;  
    }
    
    const newParticipation = 
          new this.Participations
            .Resource({code: this.cards.code.data.code,
                       participation: this.cards.participation.data});

    newParticipation
      .$save({eventId: this.cards.event.data.id})
      .then((participation) => {
        this.cards.event_success.show = true;
        this.cards.checkout.show = false;
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
              this.cards.code.data.code)
        .then((resp) => {
            const data = resp.data.data;
            if(data.valid) {
              this.cards.status.show = false;
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
        return this.cards.event_success.show;
      case 'status': 
        return this.cards.status.show;
    }
  }




}

export default eventController;
