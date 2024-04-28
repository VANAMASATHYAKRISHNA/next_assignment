import { INationPopulation } from "@/models/nationPopulation"
import React, { useEffect, useState } from "react"
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

interface IProps{
    nationPopulationList:INationPopulation[]
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const PopulationList:React.FC<IProps> = ({nationPopulationList}) =>{
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
return(
<React.Fragment>
<TableContainer component={Paper} >
<div className="border border-grey-400 p-2 mt-4 ml-9 mr-9 pr-5 mb-4">
      <h1 className="text-center font-bold text-lg">Annual Population Statistics</h1>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className="border border-grey-400 p-2 mt-4 ml-[6px] mb-4">
        <TableHead>
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
        <TableBody>
            {
             searchTableData.length > 0 && searchTableData.map((nationPopulationData:INationPopulation)=>{
                    return(
                        <StyledTableRow key={nationPopulationData.Year}>
                        <StyledTableCell component="th" scope="row">
                        {nationPopulationData.Year}
                       </StyledTableCell>
                     <StyledTableCell>
                     {nationPopulationData.Population}
                      </StyledTableCell>
                     <StyledTableCell>{nationPopulationData.Nation}</StyledTableCell>
                     <StyledTableCell>{nationPopulationData["ID Year"]}</StyledTableCell>
                     <StyledTableCell>{nationPopulationData["Slug Nation"]}</StyledTableCell>
                     <StyledTableCell>{nationPopulationData["ID Nation"]}</StyledTableCell>
                   </StyledTableRow>
                    )
                })
            }
         
        </TableBody>
      </Table>
      </div>
    </TableContainer>
</React.Fragment>)
}
export default PopulationList