import React from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

const DropDownField = ({ fieldType, fieldName = fieldType, optionsList, selected, handleOptionChange }) => {
  return (
      <FormControl sx={{ m: 'auto', minWidth: 175, maxWidth: 175, bgcolor: '#FAF9F6'}}>
        <InputLabel id="demo-simple-select-autowidth-label">{fieldName}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selected}
          onChange={handleOptionChange}
          autoWidth
          label={fieldName}
          name={fieldType}
        >
          { optionsList ?
            optionsList.map(el => {
              return <MenuItem value={el} key={el}>{el}</MenuItem>
            }) : null
          }
        </Select>
      </FormControl>
  )
}

export default DropDownField;