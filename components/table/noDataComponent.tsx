import { TableRow, TableCell } from "@mui/material";
import React from "react";

const NoDataComponent = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center">No data available</TableCell>
    </TableRow>
  );
}

export default NoDataComponent;
