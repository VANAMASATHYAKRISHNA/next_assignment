import { TableBody, TableRow, TableCell } from '@mui/material';
import React from 'react';

interface TableRowData {
  [key: string]: any;
}
interface TableBodyProps {
  data: TableRowData[];
  keys: string[];
  noDataComponent: JSX.Element;
}
const TableBodyComponent: React.FC<TableBodyProps> = ({ data, keys, noDataComponent }) => {
  return (
    <TableBody className="table-body">
      {data.length > 0 ? (
        data.map((rowData, index) => (
          <TableRow key={index}>
            {keys.map((key) => (
              <TableCell key={key}>{rowData[key]}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <>{noDataComponent}</>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
