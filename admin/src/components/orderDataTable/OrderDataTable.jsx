import { DataGrid } from '@mui/x-data-grid';
import { orderColumns } from '../../ordertable'
import { useState, useEffect } from 'react';
import './orderdatatable.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';

const updateStatus = async (id, status) => {
    try {
        await axios.post('http://localhost:8080/updatestateorder', { orderId: id, disabled: status });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const OrderTable = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/orders');
                const modifiedData = response.data.map(row => ({
                    ...row,
                    id: row.orderId
                }));
                setData(modifiedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Invoke the fetchData function
    }, []);

    const handleDisable = (id) => {
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === id) {
                    const status = (!item['disabled'] || item['disabled'] === false) ? true : false
                    updateStatus(id, status);
                    return {
                        ...item,
                        disabled: status
                    };
                }
                return item;
            });
        });
    }

    const actionColumn = [{
        field: "action", headerName: "Action", width: 250, renderCell: (params) => {
            return (
                <div className="callAction">
                    <Link to={`/orders/update/${params.row.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">Update</div>
                    </Link>
                    <div className="deleteButton" onClick={() => handleDisable(params.row.id)}>{(params.row.disabled || params.row.disabled === true) ? 'Disabled' : 'Active'}</div>
                </div>
            )
        }
    }]



    return (
        <div className="datatable" >
            <div className="datatableTitle">
                Order List
            </div>
            <DataGrid className="productDataGrid"
                rows={data}
                columns={orderColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

export default OrderTable