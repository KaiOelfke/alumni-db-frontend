class AdminPanelController {
  constructor($rootScope, $state, $transitions,
               $location, $mdToast, $auth, AclService,
               $mdSidenav, $mdDialog, $timeout, SideNavbar) {
    'ngInject';

    this.AclService = AclService;
    this.$state = $state;
    this.$transitions = $transitions;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$mdToast = $mdToast;
    this.$location = $location;
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$timeout = $timeout;
    this.menu = SideNavbar;

  }


  $onInit() {

  }


  closeMenu() {
    this.$timeout(() => this.$mdSidenav('left').close());
  }

  openMenu() {
    this.$timeout(() => this.$mdSidenav('left').open());
  }

  isSelected(page) {
    return this.menu.isPageSelected(page);
  }

  isSectionSelected(section) {
    let selected = false;
    const openedSection = this.menu.openedSection;
    if(openedSection === section){
      selected = true;
    }
    else if(section.children) {
      section.children.forEach(function(childSection) {
        if(childSection === openedSection){
          selected = true;
        }
      });
    }
    return selected;
  }

  isOpen(section) {
    return this.menu.isSectionSelected(section);
  }

  toggleOpen(section) {
    this.menu.toggleSelectSection(section);
  }  


  logout() {
    return this.$auth.signOut()
      .then(() => {
        this.$state.go('signin');
      })
      .catch(() => {
        this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Couldn\'t complete your request.'));
      });
  }  

}

export default AdminPanelController;
