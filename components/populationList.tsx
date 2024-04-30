import { INationPopulation } from "@/models/nationPopulation"
import React, {  useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import NoDataComponent from "./table/noDataComponent";
import TableBodyComponent from "./table/tableBody";
import ReusableSearchField from "./customSearch";
import CustomTableHeader from "./table/customTableHeader";
interface IProps{
    nationPopulationList:INationPopulation[]
}
const PopulationList:React.FC<IProps> = ({nationPopulationList}) =>{
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortType,setSortType] = useState<string>('population') //population,year
  const [sortYearOrder,setYearOrder] = useState<boolean>(true)
  const [sortPopulationOrder,setPopulationOrder] = useState<boolean>(true)
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
  const columnOrder: string[] = ["Year", "Population", "Nation", "ID Year", "Slug Nation", "ID Nation"];
return(
<React.Fragment>
<TableContainer component={Paper} >
<div className="border border-grey-400 p-2 mt-4 ml-9 mr-9 pr-5 mb-4">
      <h1 className="text-center font-bold text-lg text-[#191970]">Annual Population Statistics</h1>
      <div className="h-[24px] mr-[22px] gap-[10px]">
      <ReusableSearchField
        placeholder="Search for population or year"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value.trim());
          setSearchTableData(
            nationPopulationList.filter(
              (each: INationPopulation) =>
                each.Population.toString().includes(e.target.value.trim()) || each.Year.includes(e.target.value.trim())) 
            )
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchTableData={setSearchTableData}
        handleSearchWindow={handleSearchWindow}
      />
      </div>
       <div className="table-container mt-[8px]">
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className="border border-grey-400 p-2 mt-4 ml-[6px] mb-4">
      <CustomTableHeader
        sortType={sortType}
        sortYearOrder={sortYearOrder}
        sortPopulationOrder={sortPopulationOrder}
        setSortType={setSortType}
        setYearOrder={setYearOrder}
        setPopulationOrder={setPopulationOrder}
        sortByYear={sortByYear}
        sortByPopulation={sortByPopulation}
      />
        <TableBodyComponent
          data={searchTableData}
          keys={columnOrder}
          noDataComponent={<NoDataComponent />}
        />
      </Table>
      </div>
      </div>
    </TableContainer>
</React.Fragment>)
}
export default PopulationList