import React from "react";

import Datatables from "../components/Datatables/Table";
import TableCell from "../components/Datatables/TableCell";

function UserTable({ loading, dataHeader, data, handleDelete }) {
  return (
    <Datatables loading={loading} dataHeader={dataHeader}>
      {data?.map((row, index) => (
        <tr
          key={index}
          className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
        >
          <TableCell dataLabel="Name" showLabel={true}>
            <span className="font-medium text-sm text-gray-900">
              {row.courier_id}
            </span>
          </TableCell>
          <TableCell dataLabel="Email" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.courier_type}</p>
          </TableCell>
          <TableCell dataLabel="Role" showLabel={true}>
              <p>{row.working_hours ? row.working_hours : "not stated"}</p>
          </TableCell>
          <TableCell dataLabel="Email" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.regions ? row.regions.join(' ') : "not stated"}</p>
          </TableCell>


        </tr>
      ))}
    </Datatables>
  );
}

export default UserTable;
