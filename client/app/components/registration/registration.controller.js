class RegistrationController {
  constructor($mdStepper) {
    "ngInject";

    this.$mdStepper = $mdStepper;

    this.countries = [{abbrev: 'palestine'}, {abbrev: 'germany'}, {abbrev: 'uk'}];
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
      program_type: 'company',
      institution: '',
      year_of_participation: '',
      student_company_name: '',
      }
    });



  }

  nextStep(){
    const steppers = this.$mdStepper('stepper-registration');
    steppers.next();
  }

  prevStep(){
    const steppers = this.$mdStepper('stepper-registration');
    steppers.back();
  }  
  
}

export default RegistrationController;
