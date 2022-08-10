type ZipCodeInfoPlace = {
  "place name": string;
  longitude: string;
  state: string;
  "state abbreviation": string;
  latitude: string;
};

export type ZipCodeInfoResponse = {
  "post code": string;
  country: string;
  "country abbreviation": string;
  places: ZipCodeInfoPlace[];
};
