const XLSX = require('xlsx');

class DataLoader {
  constructor() {
    this.loadData();
  }

  loadData() {
    this.data = this.loadXLSXWorkbook();
    this.categories = {};

    const sheetNames = this.data.SheetNames;

    for (let i = 1; i < sheetNames.length; i++) {
      this.categories[sheetNames[i]] = {
        slug: sheetNames[i].toLowerCase(),
        name: sheetNames[i],
      };
    }
  }

  getCategories() {
    return this.categories;
  }

  getDataAsJSON() {
    const json = {};
    let fakeId = 0;

    for (let i = 1; i < this.data.SheetNames.length; i++) {
      const sheetName = this.data.SheetNames[i];

      for (let j in this.data.Sheets[sheetName]) {
        let item = this.data.Sheets[sheetName][j];
        if (item.f && item.f.startsWith('IMAGE("')) {
          item.v = item.f
            .replace('IMAGE("', '')
            .replace('")')
            .replace('undefined', '');
        }
      }

      const sheetDataAsJSON = XLSX.utils.sheet_to_json(
        this.data.Sheets[sheetName],
        { raw: true },
      );

      for (const k in sheetDataAsJSON) {
        let item = sheetDataAsJSON[k];
        item.id = fakeId++;
        if (item.Variation) {
          item.fullName = `${item.Variation} ${item.Name}`;
        } else {
          item.fullName = item.Name;
        }
        item.category = sheetName.toLowerCase();
        json[item.id] = item;
      }
    }

    return json;
  }

  getData() {
    return this.data;
  }

  loadXLSXWorkbook() {
    return XLSX.readFile('data/acnh.xlsx');
  }
}

module.exports = DataLoader;
