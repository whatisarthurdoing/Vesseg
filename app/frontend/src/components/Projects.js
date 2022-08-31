import React , { useContext, useEffect, useState} from 'react'
import { Button, Link} from '@mui/material';
import { DataGrid , GRID_CHECKBOX_SELECTION_COL_DEF} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import "./CSS/Projects.css";
import { UserContext } from '../context/UserContext';

const Projects = () => {
  const [tableData, setTableData] = useState([])
  const [token,] = useContext(UserContext);

  // API request to get all existing projects for user
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

  // Columns of the table. Fields: ID, Title, Status
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

  /*
    Delete User
  */

    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

  // API request to delete projects
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
    handleClose();
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
        <Button id='deleteButtonProjects' variant="outlined" color="error" onClick={handleClickOpen}>Delete</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {"Do you want to delete the projects permanently?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting the projects will lead to deleting all your progress and data as well.
              This is permanent and can not be reclaimed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{color: '#2F3747'}} onClick={handleClose}>Back</Button>
            <Button id="deleteUserButtonInField" style={{color: 'red'}} onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
export default Projects;