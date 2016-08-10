class RegistrationController {
  constructor($mdStepper, ProfileUtilities, Users, $auth, $mdToast, $state) {
    "ngInject";
    this.$mdStepper = $mdStepper;
    this.ProfileUtilities = ProfileUtilities;
    this.$mdToast = $mdToast;
    this.$auth = $auth;
    this.$state = $state;
    this.Users = Users;
  }

  $onInit() {
    this.notQuery = true;

    this.countries = [{abbrev: 'palestine'},
                      {abbrev: 'germany'}, {abbrev: 'uk'}];
    this.myDate = new Date();
    this.minDate = new Date(
        1970,
        1,
        1);

    this.maxDate = new Date(
        this.myDate.getFullYear(),
        this.myDate.getMonth(),
        this.myDate.getDate());

    this.stepData = [];

    this.stepData.push({ data: {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      country: '',
      gender: '0',
      }
    });

    this.stepData.push({ data: {
      country_of_participation: '',
      program_type: '0',
      institution: '',
      year_of_participation: '',
      student_company_name: '',
      }
    });

    this.dateCheckRegex = this.ProfileUtilities.dateCheckRegex;
    this.countries = this.ProfileUtilities.countries;
    this.years = this.ProfileUtilities.years;    
    this.permittedCountries = this.ProfileUtilities.permittedCountries;
  }

  nextStep(){
    const steppers = this.$mdStepper('stepper-registration');
    steppers.next();
  }

  prevStep(){
    const steppers = this.$mdStepper('stepper-registration');
    steppers.back();
  }

  finish(){

    const profileData = {};
    angular.extend(profileData, this.stepData[0].data, this.stepData[1].data);

    this.notQuery = false;
    this.$auth.updateAccount(profileData)
      .then((user) => {
        this.Users
            .sendConfirmationEmail()
            .then((resp) => {
              console.log('success email confirmation', resp);
              this.notQuery = true;
              this.$state.go('userPanel.home');
            })
            .catch((err) => {
              console.log('error email confirmation', err);
              this.notQuery = true;
              this.$state.go('userPanel.home');
            });
      })
      .catch((err) => {
        console.log(err);
        this.notQuery = true;
        this.$mdToast.show(
              this.$mdToast.simple()
                  .highlightClass('md-warn')
                  .textContent('Couldn\'t complete your request!'));
      });



  }

}

export default RegistrationController;
