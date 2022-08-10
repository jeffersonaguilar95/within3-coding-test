import { QueryZipCodeInfoArgs } from "../graphqlTypes";
import { AxiosInstance } from "axios";
import { ZipCodeInfoResponse } from "./zipCodeInfo";

export const zipCodeInfoResolver = async (
  _parent,
  params: QueryZipCodeInfoArgs,
  { api }: { api: AxiosInstance }
) => {
  const { zipCode, countryCode } = params;

  try {
    const { data } = await api.get<ZipCodeInfoResponse>(
      `/${countryCode}/${zipCode}`
    );

    const cityInfo = data.places?.[0];

    return {
      country: data.country,
      countryCode: data["country abbreviation"],
      zipCode: data["post code"],
      city: cityInfo["place name"],
      state: cityInfo.state,
      stateCode: cityInfo["state abbreviation"],
    };
  } catch (error: any) {
    throw error.message;
  }
};

export default {
  Query: {
    zipCodeInfo: zipCodeInfoResolver,
  },
};
