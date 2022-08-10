import axios from "axios";
import { zipCodeInfoResolver } from "./zipCodeInfo.resolver";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Zip Code Info Resolver", () => {
  beforeAll(() => {});

  it("it should return the zip code info data", async () => {
    const zipCodeInfoMocked = {
      data: {
        "post code": "30101",
        country: "United States",
        "country abbreviation": "US",
        places: [
          {
            "place name": "Acworth",
            longitude: "-84.6477",
            state: "Georgia",
            "state abbreviation": "GA",
            latitude: "34.0756",
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(zipCodeInfoMocked);

    const response = await zipCodeInfoResolver(
      {},
      { zipCode: "30101", countryCode: "US" },
      { api: mockedAxios }
    );

    const expectedResponse = {
      country: "United States",
      city: "Acworth",
      countryCode: "US",
      state: "Georgia",
      stateCode: "GA",
      zipCode: "30101",
    };

    expect(response).toEqual(expectedResponse);
  });
});
