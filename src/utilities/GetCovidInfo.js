import axios from "axios";

// @params: a location
// @return: districtList, covinInfo of the location, active cases
export const GetCovidInfo = async (location) => {
  const districtDataUrl = "https://api.covid19india.org/v4/data.json";

  return axios
    .get(districtDataUrl)
    .then((response) => {
      const raw = response.data;
      const rawStates = Object.keys(raw);

      // 1. Clean the data
      const states = rawStates.filter((state) => state !== "TT");

      // 2. Create a district list, Array of { district, state}
      let districtList = new Array();
      states.forEach((state) => {
        const raw2 = raw[state].districts;
        const districts = Object.keys(raw2);
        districts.forEach((district, i) => {
          districtList.push({
            district: district,
            state: state,
            id: state + i,
          });
        });
      });
      districtList.sort((a, b) => a.district > b.district);

      // 3. Get covid counts for the location inputted.
      // TODO: to be revisited to using geolocatino api
      const districtBasic = districtList.find(
        (district) => location === district.district
      );
      if (districtBasic) {
        const covidInfo =
          raw[districtBasic.state].districts[districtBasic.district];
        // console.log(covidInfo);

        // 4. Calculate safety score
        // The logic of active is: Active = Confirmed - Recovered - Deceased - Migrated Others
        const { confirmed, deceased, recovered } = covidInfo.total;
        const active = confirmed - recovered - deceased;

        // 5. Return values in Object type
        return { districtList, covidInfo, active, msg: "ok" };
      }
    })
    .catch((err) => {
      console.log(err);
      return { msg: "not ok" };
    });
};
