import { DataGrid } from '@mui/x-data-grid';
import { productColumns } from '../../producttable'
import { useState, useEffect } from 'react';
import './productdataTable.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';

const updateStatus = async (id, status) => {
    try {
        await axios.post('http://localhost:8080/updatestateproduct', { productId: id, productStatus: status });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const ProductTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getproducts');
                const modifiedData = response.data.map(row => ({
                    ...row,
                    id: row.article_id // Sử dụng trường productId làm id duy nhất
                }));
                setData(modifiedData); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
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
        field: "action", headerName: "Action", width: 200, renderCell: (params) => {
            return (
                <div className="callAction">
                    <Link to={`/products/update/${params.row.id}`} className="link" style={{ textDecoration: "none" }}>
                        <div className="viewButton">Update</div>
                    </Link>
                    <div className="deleteButton" onClick={() => handleDisable(params.row.id)}>{params.row.disabled ? 'Disabled' : 'Active'}</div>
                </div>
            )
        }
    }]



    return (
        <div className="datatable" >
            <div className="datatableTitle">
                Add New Product
                <Link to="/products/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid className="productDataGrid"
                rows={data}
                columns={productColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

export default ProductTable