import React, { useState } from "react";
import { Typography, Slider, Drawer, Box, Toolbar } from "@material-ui/core";

const FilterComponent = () => {
  const [rangeVal, setRangeVal] = useState([0, 2000]);

  const changeRange = (e, value) => {
    console.log('changeRange: ',value)
    setRangeVal(value);
  };
  const valuetext = (value) => {
    return `${value}`;
  };

  return (
    <Drawer
      variant="permanent"
      className="filter-Container"
      sx={{
        width: 280,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", padding: "20px", width: "150px" }}>
        <Typography  gutterBottom>
          Filters
        </Typography>
        <Slider
          getAriaLabel={()=>'Price Range'}
          value={rangeVal}
          onChange={changeRange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </Drawer>
  );
};

export default FilterComponent;
