import React , { useEffect, useState} from 'react'
import { Button} from '@mui/material';
import { DataGrid , GRID_CHECKBOX_SELECTION_COL_DEF, selectedGridRowsCountSelector} from '@mui/x-data-grid';

import "./CSS/Projects.css";

const Projects = () => {
  const [tableData, setTableData] = useState([])
  const [token, ] = useState(localStorage.getItem("myToken"))
  const [selectedProjects, setSelectedProjects] = useState([]); //row IDs

  useEffect(() => {
    const fetchProjects = async () => {
      const requestOptions = {
        method: "GET", 
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      };
      try{
        fetch("/projects/", requestOptions)
        .then((data) => data.json())
        .then((data) => setTableData(data));
      }
      catch(e){
        console.log(e)
      }
    }
    fetchProjects();
  }, []);

  const columns =[
      {
        field: "id", 
        headerName: "ID",
        sortable: false, 
        width: 70,
        hide: true
      },
      {
        field: "title",
        headerName: "NAME",
        flex: 1
        //sortable
      },
      {
        field: "description", 
        headerName: "STATUS", 
        sortable: false, 
        flex: 1
      }, 
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 70,
      },
  ]

  const handleDeleteAll = () => {
    const filteredProjectList = tableData.filter(
      (item) => !selectedProjects.includes(item.id)
    );
    setTableData(filteredProjectList);
  };
  

  return (
    <div className='projects'>
        <h1>Projects</h1>
        <div className='table'>
          <DataGrid
            rows={tableData}
            columns = {columns}
            disableColumnMenu
            checkboxSelection
            autoPageSizes
            autoHeight
            rowsPerPageOptions={[5]}
            onSelectionModelChange={(ids) => {
              setSelectedProjects(ids);
            }}
          />
        </div>
      <div className='buttons'>
        <Button href="/project" variant="outlined" color="success">Create new Project</Button>
        <Button variant="outlined" color="error" onClick={handleDeleteAll}>Delete</Button>
      </div>
    </div>
  )
}
export default Projects;