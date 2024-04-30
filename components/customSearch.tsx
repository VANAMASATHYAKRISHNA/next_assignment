import React, { ChangeEvent } from 'react';
import SearchBoxIcon from "@/public/Icons/search.svg";
import CrossIcon from "@/public/Icons/crossIcon.svg";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment } from '@mui/material';
interface Props {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchTableData: React.Dispatch<React.SetStateAction<any[]>>;
  handleSearchWindow: () => void;
}
export const CustomSearchField = styled(TextField)({
    width: "30%",
    marginTop:"4px",
    marginLeft:"6px",
    "&:focus-within fieldset": {
      border: "1px solid #36415d !important",
    },
    "&:focus-visible fieldset": {
      border: "1px solid #36415d !important",
    },
    "& .MuiOutlinedInput-root": {
      height: "35px",
      paddingLeft: "16px",
      paddingRight: "8px",
      bottom: "8px",
      background: "#FFF",
    },
  });
const ReusableSearchField: React.FC<Props> = ({ placeholder, value, onChange, searchTerm, setSearchTerm, setSearchTableData, handleSearchWindow }) => {
  return (
    <CustomSearchField
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onChange}
      autoFocus={true}
      InputLabelProps={{ shrink: false }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Image src={SearchBoxIcon} alt="" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
            <Image
              className="cursor-pointer w-[12px] h-[12px]"
              onClick={handleSearchWindow}
              src={CrossIcon}
              alt={"close icon"}
              data-testid="search-close"
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ReusableSearchField;
