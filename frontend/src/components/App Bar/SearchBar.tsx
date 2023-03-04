// modules import
import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// MUI imports
import { Autocomplete, TextField } from "@mui/material";

// Context imports
import { MainContext } from "../../context/MainContext";

// utils import
import { searchContacts, addContact } from "../../utils/contactFetch";

type propsType = {
  section: string;
};

type OptionsType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const SearchBar = (props: propsType) => {
  const [options, setoptions] = useState<OptionsType[]>([]);
  const [searchText, setSearchText] = useState<string | null>(null);

  const { token } = useContext(MainContext);

  const queryInvalidate = useQueryClient();

  const searchQuery = useQuery({
    queryKey: ["search", token],
    queryFn: () => searchContacts(searchText, token!),
    onSuccess: (data) => {
      setoptions(data.data);
    },
  });

  const addContactMutation = useMutation({
    mutationKey: ["addContact", token],
    mutationFn: (recipientId: string) =>
      addContact({ contactId: recipientId }, token!),
    onSuccess: () => {
      queryInvalidate.invalidateQueries({ queryKey: ["contacts", token] });
    },
  });

  const autoCompleteHandler = (event: any, newInputValue: string) => {
    setSearchText(newInputValue);
    searchQuery.refetch({});
  };

  const onChangeHandler = (
    event: any,
    newValue: OptionsType | null,
    reason: string
  ) => {
    console.log(newValue);
    addContactMutation.mutate(newValue!._id);
  };
  return (
    <Autocomplete
      size="small"
      sx={{ width: "300px" }}
      id={`autocomplete_search_${props.section}`}
      options={options}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      clearOnBlur={true}
      noOptionsText={`no ${props.section} found`}
      filterOptions={(x) => x}
      onChange={onChangeHandler}
      onInputChange={autoCompleteHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`search ${props.section}`}
          variant="filled"
          sx={{
            "& label.Mui-focused": {
              color: "white",
            },
          }}
        />
      )}
    />
  );
};

export default SearchBar;
