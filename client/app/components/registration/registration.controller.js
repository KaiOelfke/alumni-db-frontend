class RegistrationController {
  constructor($mdStepper) {
    "ngInject";
    this.$mdStepper = $mdStepper;
  }

  $onInit() {
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
      firstname: '',
      lastname: '',
      birthday: '',
      country: '',
      gender: 'female',
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

    this.dateCheckRegex = /(^(((0[1-9]|1[0-9]|2[0-8])[\.](0[1-9]|1[012]))|((29|30|31)[\.](0[13578]|1[02]))|((29|30)[\.](0[4,6,9]|11)))[\.](19|[2-9][0-9])\d\d$)|(^29[\.]02[\.](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
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
    // call the registration api
    // if success then go to home
    // change the roles to registeredUser

    // if not display a notification.
    // stay in the same page.
  }

}

export default RegistrationController;
