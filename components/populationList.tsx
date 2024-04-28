import { INationPopulation } from "@/models/nationPopulation"
import React, {  useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SortDescIcon } from "./SortDescIcon";
import { NoSortIcon } from "./NoSortIcon";
import { SortAscIcon } from "./SortAscIcon";
import { TextField, InputAdornment } from "@mui/material";
import SearchBoxIcon from "@/public/Icons/search.svg";
import CrossIcon from "@/public/Icons/crossIcon.svg";
import Image from "next/image";
interface IProps{
    nationPopulationList:INationPopulation[]
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#191970',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 16,
      font:'Open Sans' 
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      font:'Open Sans'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  export const SearchAreaContainer = styled("div")((props: any) => ({
    gap: "10px",
    height: "24px",
    marginRight: props.marginRight ? "22px" : "",
  })) as any;
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
  export const CloseIcon = styled(Image)({
    cursor: "pointer",
    width: "12px",
    height: "12px",
  });
const PopulationList:React.FC<IProps> = ({nationPopulationList}) =>{
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType,setSortType] = useState('population') //population,year
  const [sortYearOrder,setYearOrder] = useState(true)
  const [sortPopulationOrder,setPopulationOrder] = useState(true)
  const [searchTableData, setSearchTableData] = useState<INationPopulation[]>([]);
  useEffect(()=>{
setSearchTableData(nationPopulationList)
  },[nationPopulationList])

  const sortByYear =() => {
    if (searchTableData.length === 0) {
      return; 
    }
    setSearchTableData((tableData:INationPopulation[]) => {
    const sortedData = [...tableData].sort((a, b) => {
      return sortYearOrder
      ? (parseInt(a.Year) - parseInt(b.Year))
      :(parseInt(b.Year) - parseInt(a.Year)); 
    })
    return sortedData;
    });
    setYearOrder(!sortYearOrder)
   
  }
  const sortByPopulation =() => {
    if (searchTableData.length === 0) {
      return; 
    }
    setSearchTableData((tableData:INationPopulation[]) => {
    const sortedData = [...tableData].sort((a, b) => {
      return sortPopulationOrder
      ? (a.Population - b.Population)
      :(b.Population - a.Population); 
    })
    return sortedData;
    });
    setPopulationOrder(!sortPopulationOrder)
   
  }
  const handleSearchWindow = () => {
    setSearchTableData(nationPopulationList);
     setSearchTerm("");
  };
return(
<React.Fragment>
<TableContainer component={Paper} >
<div className="border border-grey-400 p-2 mt-4 ml-9 mr-9 pr-5 mb-4">
      <h1 className="text-center font-bold text-lg text-[#191970]">Annual Population Statistics</h1>
      <SearchAreaContainer marginRight>
              <CustomSearchField
                placeholder="Search for population or year"
                variant="outlined"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchTerm(e.target.value.trim());
                  setSearchTableData(
                    nationPopulationList.filter(
                      (each: INationPopulation) =>
                        each.Population.toString().includes(e.target.value.trim()) || each.Year.includes(e.target.value.trim())) 
                    )
                
                }}
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
                      <CloseIcon
                        onClick={handleSearchWindow}
                        src={CrossIcon}
                        alt={"close icon"}
                        data-testid="search-close"
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </SearchAreaContainer>
       <div className="table-container mt-[8px]">
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className="border border-grey-400 p-2 mt-4 ml-[6px] mb-4">
        <TableHead className="sticky top-0 bg-[#191970]">
          <TableRow>
            <StyledTableCell onClick={()=>{
          if(sortType === 'population')
            {
              setSortType('year')
              setYearOrder(true)
            }
              sortByYear()
          }}> <div  className="flex items-center">
            <p>Year</p>
            <div className="ml-[4px]">
              {sortType === 'year'?<div>
              {
              sortYearOrder ? <SortAscIcon/> : <SortDescIcon />
              }
              </div> :<NoSortIcon/>}
            
            </div>
          </div> </StyledTableCell>
          <StyledTableCell onClick={()=>{
          if(sortType === 'year')
            {
              setSortType('population')
              setPopulationOrder(true)
            }
              sortByPopulation()
          }} >
            <div  className="flex items-center">
            <p> Population </p>
            <div className="ml-[4px]">
              {sortType === 'population' ? <div>
              {
              sortPopulationOrder ? <SortAscIcon/> : <SortDescIcon />
              }
              </div> :<NoSortIcon/>}
            
            </div>
          </div>
          </StyledTableCell>
          <StyledTableCell >Nation</StyledTableCell>
            <StyledTableCell >Id Year</StyledTableCell>
            <StyledTableCell >Slug Nation</StyledTableCell>
            <StyledTableCell >Id Nation On</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
        {searchTableData.length > 0 ? (
          searchTableData.map((nationPopulationData) => (
            <TableRow key={nationPopulationData.Year}>
              <TableCell component="th" scope="row">
                {nationPopulationData.Year}
              </TableCell>
              <TableCell>{nationPopulationData.Population}</TableCell>
              <TableCell>{nationPopulationData.Nation}</TableCell>
              <TableCell>{nationPopulationData["ID Year"]}</TableCell>
              <TableCell>{nationPopulationData["Slug Nation"]}</TableCell>
              <TableCell>{nationPopulationData["ID Nation"]}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
         
        </TableBody>
      </Table>
      </div>
      </div>
    </TableContainer>
</React.Fragment>)
}
export default PopulationList