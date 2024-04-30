import { TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import React from 'react';
import { NoSortIcon } from '../NoSortIcon';
import { SortAscIcon } from '../SortAscIcon';
import { SortDescIcon } from '../SortDescIcon';

interface TableHeaderProps {
  sortType: string;
  sortYearOrder: boolean;
  sortPopulationOrder: boolean;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  setYearOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setPopulationOrder: React.Dispatch<React.SetStateAction<boolean>>;
  sortByYear: () => void;
  sortByPopulation: () => void;
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
const CustomTableHeader: React.FC<TableHeaderProps> = ({
  sortType,
  sortYearOrder,
  sortPopulationOrder,
  setSortType,
  setYearOrder,
  setPopulationOrder,
  sortByYear,
  sortByPopulation,
}) => {
  return (
    <TableHead className="sticky top-0 bg-[#191970]">
      <TableRow>
        <StyledTableCell
          onClick={() => {
            if (sortType === 'population') {
              setSortType('year');
              setYearOrder(true);
            }
            sortByYear();
          }}
        >
          <div className="flex items-center">
            <p>Year</p>
            <div className="ml-[4px]">
              {sortType === 'year' ? (
                <div>{sortYearOrder ? <SortAscIcon /> : <SortDescIcon />}</div>
              ) : (
                <NoSortIcon />
              )}
            </div>
          </div>
        </StyledTableCell>
        <StyledTableCell
          onClick={() => {
            if (sortType === 'year') {
              setSortType('population');
              setPopulationOrder(true);
            }
            sortByPopulation();
          }}
        >
          <div className="flex items-center">
            <p> Population </p>
            <div className="ml-[4px]">
              {sortType === 'population' ? (
                <div>{sortPopulationOrder ? <SortAscIcon /> : <SortDescIcon />}</div>
              ) : (
                <NoSortIcon />
              )}
            </div>
          </div>
        </StyledTableCell>
        <StyledTableCell>Nation</StyledTableCell>
        <StyledTableCell>Id Year</StyledTableCell>
        <StyledTableCell>Slug Nation</StyledTableCell>
        <StyledTableCell>Id Nation On</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
