let SideNavbarFactory = function ($location) {
  'ngInject';


  const sections = [{
    name: 'Home',
    url: '/admin',
    type: 'link'
  }];

  sections.push({
    name: 'Users',
    url: '/admin/users',
    type: 'link'
  });

  sections.push({
    name: 'Subscriptions',
    url: '/admin/subscriptions',
    type: 'link'
  });

  sections.push({
    name: 'Events',
    url: '/admin/events',
    type: 'link'
  });

  const selectSection = (section) =>  {
    this.openedSection = section;
  }

  const toggleSelectSection = (section) => {
    this.openedSection = (this.openedSection === section ? null : section);
  }

  const isSectionSelected = (section) => {
    return this.openedSection === section;
  }

  const selectPage = (section, page) => {
    this.currentSection = section;
    this.currentPage = page;
  }

  const isPageSelected = (page) => {
    return page && this.currentPage && this.currentPage.url === page.url;
  }

  const onLocationChange = () => {
    const path = this.$location.path();
    const introLink = {
      name: "Home",
      url:  "/",
      type: "link"
    };

    if (path == '/') {
      this.selectSection(introLink);
      this.selectPage(introLink, introLink);
      return;
    }

    const matchPage = (section, page) => {
      if (path.indexOf(page.url) !== -1) {
        this.selectSection(section);
        this.selectPage(section, page);
      }
    };

    this.sections.forEach(function(section) {
      if (section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if (section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });
  }


  return {sections, isPageSelected, selectPage,
          toggleSelectSection, selectSection,
          isSectionSelected};
};

export default SideNavbarFactory;
