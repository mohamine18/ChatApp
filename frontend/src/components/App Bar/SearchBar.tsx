// modules import
import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// MUI imports
import { Autocomplete, TextField } from "@mui/material";

// Context imports
import { MainContext } from "../../context/MainContext";

// utils import

import { searchContacts } from "../../utils/contactFetch";

type propsType = {
  section: string;
};

const SearchBar = (props: propsType) => {
  const [options, setoptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { token } = useContext(MainContext);

  const searchQuery = useQuery({
    queryKey: ["search", token],
    queryFn: () => searchContacts(searchText, token!),
    onSuccess: (data) => {
      setoptions(data.data);
      console.log(options);
    },
  });

  const autoCompleteHandler = (event: any, newInputValue: string) => {
    setSearchText(newInputValue);
  };

  return (
    <Autocomplete
      size="small"
      sx={{ width: "300px" }}
      id={`autocomplete_search_${props.section}`}
      options={options}
      clearOnBlur={true}
      noOptionsText={`no ${props.section} found`}
      filterOptions={(x) => x}
      onInputChange={autoCompleteHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`search ${props.section}`}
          color="secondary"
        />
      )}
    />
  );
};

export default SearchBar;
