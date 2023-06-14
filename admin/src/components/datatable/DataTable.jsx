import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../datatablesource'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './datatable.scss';


const DataTable = () => {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                const modifiedData = response.data.map(row => ({
                    ...row,
                    id: row.userId
                }));
                setUserData(modifiedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Invoke the fetchData function
    }, []);


    return (
        <div className="datatable" >
            <div className="datatableTitle">
                User List
            </div>
            <DataGrid className="userDataTable"
                rows={userData}
                columns={userColumns}
                pageSize={9}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

export default DataTable