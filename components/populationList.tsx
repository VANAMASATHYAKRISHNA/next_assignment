import { INationPopulation } from "@/models/nationPopulation"
import React from "react"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
interface IProps{
    nationPopulationList:INationPopulation[]
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
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
return(
<React.Fragment>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id Nation</StyledTableCell>
            <StyledTableCell align="right">Id Year</StyledTableCell>
            <StyledTableCell align="right">Nation</StyledTableCell>
            <StyledTableCell align="right">Population</StyledTableCell>
            <StyledTableCell align="right">Slug Nation</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                nationPopulationList.map((nationPopulationData:INationPopulation)=>{
                    return(
                        <StyledTableRow key={nationPopulationData["ID Nation"]}>
                        <StyledTableCell component="th" scope="row">
                       {nationPopulationData["ID Nation"]}
                     </StyledTableCell>
                     <StyledTableCell  align="right">
                       {nationPopulationData["ID Year"]}
                     </StyledTableCell>
                     <StyledTableCell align="right">{nationPopulationData.Nation}</StyledTableCell>
                     <StyledTableCell align="right">{nationPopulationData.Population}</StyledTableCell>
                     <StyledTableCell align="right">{nationPopulationData["Slug Nation"]}</StyledTableCell>
                     <StyledTableCell align="right">{nationPopulationData.Year}</StyledTableCell>
                   </StyledTableRow>
                    )
                })
            }
         
        </TableBody>
      </Table>
    </TableContainer>
</React.Fragment>)
}
export default PopulationList