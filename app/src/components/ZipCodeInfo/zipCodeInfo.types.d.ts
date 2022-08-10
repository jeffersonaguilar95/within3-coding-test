export type ZipCodeInfoType = {
  country: string;
  city: string;
  countryCode: string;
  state: string;
  stateCode: string;
  zipCode: string;
};

export type ZipCodeInfoResponseType = {
  zipCodeInfo: ZipCodeInfoType;
};

export type ZipCodeInfoParamsType = { zipCode: string; countryCode: string };
