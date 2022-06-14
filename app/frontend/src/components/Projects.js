import React , {useMemo, useEffect, useState} from 'react'
import { Button } from '@mui/material';
import { DataGrid , GRID_CHECKBOX_SELECTION_COL_DEF} from '@mui/x-data-grid';
import "./CSS/Projects.css";
import testdata from "./testdata.json";

const Projects = () => {
  
  //Start Data
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    fetch("")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])
  console.log(tableData)
  //End Data


  
  const columns = useMemo( () => [
      {
        field: "id", 
        headerName: "ID",
        sortable: false, 
        width: 70,
        hide: true
      },
      {
        field: "name",
        headerName: "NAME",
        flex: 1
        //sortable
      },
      {
        field: "status", 
        headerName: "STATUS", 
        sortable: false, 
        flex: 1
      }, 
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 70,
      },
    ],
  );
  const rows = testdata;
  return (
    <div className='projects'>
        <h1>Projects</h1>
        <div className='table'>
          <DataGrid
            rows={rows}
            columns = {columns}
            autoPageSize = {true}
            pageSize = {5}
            disableColumnMenu
            checkboxSelection = {true}  
          />
        </div>
      <div className='buttons'>
        <Button variant="outlined" color="success">Create new Project</Button>
        <Button variant="outlined" color="error">Delete</Button>
      </div>
    </div>
  )
}
export default Projects;