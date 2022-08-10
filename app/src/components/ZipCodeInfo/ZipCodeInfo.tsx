import * as React from "react";
import { useState, SyntheticEvent, ChangeEvent, Fragment } from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Send as SendIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { COUNTRIES } from "./zipCodeInfo.constants";
import { useZipCodeInfo } from "./zipCodeInfo.hooks";

export default function ZipCodeInfo() {
  const [countryCode, setCountryCode] = useState("US");
  const [zipCode, setZipCode] = useState("");
  const {
    getZipCodeInfo,
    loading,
    zipCodeInfoList,
    latestZipCodeInfo,
    clearZipCodeInfoHistory,
  } = useZipCodeInfo();

  const handleSelectChange = (event: SelectChangeEvent) => {
    setCountryCode(event.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (countryCode && zipCode) {
      getZipCodeInfo({ variables: { countryCode, zipCode } });
    }
  };

  return (
    <Fragment>
      <Typography variant="h5">Zip Code Information</Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="country-select">Country</InputLabel>
            <Select
              required
              labelId="country-select"
              value={countryCode}
              label="Country"
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {COUNTRIES.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <TextField
              required
              label="Zip Code"
              onChange={handleInputChange}
              value={zipCode}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <Button
              variant="contained"
              endIcon={
                loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <SendIcon />
                )
              }
              type="submit"
              disabled={loading}
            >
              Search
            </Button>
          </FormControl>
          {Boolean(zipCodeInfoList.length) && (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <Button
                variant="outlined"
                onClick={clearZipCodeInfoHistory}
                endIcon={<DeleteIcon />}
              >
                Clear history
              </Button>
            </FormControl>
          )}
        </Grid>
      </form>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      {Boolean(zipCodeInfoList.length) && (
        <Fragment>
          <Typography variant="subtitle1">Search History (last 5)</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Zip Code</TableCell>
                  <TableCell>City Name</TableCell>
                  <TableCell>State Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Loading skeleton */}
                {loading && (
                  <TableRow sx={{ width: "100%" }}>
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width="80%"
                        height={20}
                        animation="wave"
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width="80%"
                        height={20}
                        animation="wave"
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width="80%"
                        height={20}
                        animation="wave"
                      />
                    </TableCell>
                  </TableRow>
                )}
                {/* Mapper to show zip code info list */}
                {zipCodeInfoList.map((zipCodeInfo) => (
                  <TableRow
                    key={zipCodeInfo.zipCode}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {zipCodeInfo.zipCode}
                      {String(latestZipCodeInfo?.zipCodeInfo.zipCode) ===
                        zipCodeInfo.zipCode && (
                        <Chip
                          label="latest"
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{ marginLeft: 1 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{zipCodeInfo.city}</TableCell>
                    <TableCell>{zipCodeInfo.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </Fragment>
  );
}
