import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
          </TabList>
        </Box>
        <div>
          <TabPanel value="1">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Find Email"
                className="form-input py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <button className="rounded-md bg-indigo-600 text-sm font-semibold py-2 px-4 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
                Find
              </button>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Find Linkedin"
                className="form-input py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <button className="rounded-md bg-indigo-600 text-sm font-semibold py-2 px-4 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
                Find
              </button>
            </div>
          </TabPanel>
        </div>
      </TabContext>
    </Box>
  );
}
