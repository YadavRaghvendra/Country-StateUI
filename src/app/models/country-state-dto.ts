export class Country {
  id: number = 0;
  countryName: string = '';
  countryCode: string = '';
  createdBy: string = '';
  createdOn: Date = new Date();
  lastUpdatedOn: Date = new Date();
}

export class State {
  id: number = 0;
  stateName: string = '';
  countryId: number = 0;
  stateCode: string = '';
  createdBy: string = '';
  createdOn: Date = new Date();
  lastUpdatedOn: Date = new Date();
}