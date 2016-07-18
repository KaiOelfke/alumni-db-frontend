class PremiumController {
  constructor() {
    this.name = 'permium';
    this.searchText = null;
    this.selectedItem = null;

    this.reasons = [];
    for (let i = 0; i < 5; i++) {
      this.reasons.push({
        content: `Reason Number: ${i}`,
      });
    }

  }

  searchTextChange() {

  }

  selectedItemChange() {

  }

  querySearch() {

  }
}

export default PremiumController;
