import React , { useContext, useEffect, useState} from 'react'
import { Button, Link} from '@mui/material';
import { DataGrid , GRID_CHECKBOX_SELECTION_COL_DEF} from '@mui/x-data-grid';

import "./CSS/Projects.css";
import { UserContext } from '../context/UserContext';

const Projects = () => {
  const [tableData, setTableData] = useState([])
  const [token,] = useContext(UserContext);

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
        renderCell: (params) => {
          const text = '/project/projectId/projectName';
          const getName = params.value;
          const getId = params.id;
          let fetcher = text.replace("projectId", getId);
          fetcher = fetcher.replace("projectName", getName);

          return <Link href={fetcher}>{params.value}</Link>;
        },
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

  const [status, setStatus] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]); //row IDs

  const handleDelete = () => {
    const requestOptions = {
      method: "DELETE", 
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
      //selectedProjects: Array von Indices die geloescht werden sollen
    };
    const filteredProjectList = tableData.filter(
      (item) => !selectedProjects.includes(item.id)
    );
    setTableData(filteredProjectList);
    try{
      for ( var i = 0; i < selectedProjects.length; i ++){
        const element = selectedProjects[i];
        const text = '/projects/element'
        const fetcher = text.replace("element", element)
        fetch(fetcher, requestOptions)
        .then(() => setStatus('Delete successful'));
      }
    }
    catch(e){
      console.log(e);
    }
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
            pageSize={5}
            autoHeight
            rowsPerPageOptions={[5]}
            onSelectionModelChange={(ids) => {
              setSelectedProjects(ids);
            }}
            disableSelectionOnClick = {true}
          />
        </div>
      <div className='buttons'>
        <Button id='createProjectButton' href="/createProject" variant="contained" style={{backgroundColor:'#db7093', color:'white'}}>Create new Project</Button>
        <Button id='deleteButtonProjects' variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  )
}
export default Projects;