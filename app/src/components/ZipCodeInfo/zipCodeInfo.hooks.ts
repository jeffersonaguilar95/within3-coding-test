import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { loader } from "graphql.macro";
import {
  ZipCodeInfoParamsType,
  ZipCodeInfoResponseType,
  ZipCodeInfoType,
} from "./zipCodeInfo.types";

const GET_ZIP_CODE_INFO = loader("./zipCodeInfo.graphql");

export const useZipCodeInfo = () => {
  const [zipCodeInfoList, setZipCodeInfoList] = useState<ZipCodeInfoType[]>([]);

  const [getZipCodeInfo, { loading, data }] = useLazyQuery<
    ZipCodeInfoResponseType,
    ZipCodeInfoParamsType
  >(GET_ZIP_CODE_INFO);

  useEffect(() => {
    const historicalZipCodes = localStorage.getItem("historicalZipCodes");
    if (historicalZipCodes) {
      setZipCodeInfoList(JSON.parse(historicalZipCodes));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const existingZipCode = zipCodeInfoList.find(
        (current) => current.zipCode === data.zipCodeInfo.zipCode
      );
      if (!existingZipCode) {
        setZipCodeInfoList((oldList) => [
          data.zipCodeInfo,
          ...oldList.slice(0, 4),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (zipCodeInfoList.length) {
      localStorage.setItem(
        "historicalZipCodes",
        JSON.stringify(zipCodeInfoList)
      );
    }
  }, [zipCodeInfoList]);

  const clearZipCodeInfoHistory = () => {
    setZipCodeInfoList([]);
    localStorage.clear();
  };

  return {
    getZipCodeInfo,
    loading,
    zipCodeInfoList,
    latestZipCodeInfo: data,
    clearZipCodeInfoHistory,
  };
};
