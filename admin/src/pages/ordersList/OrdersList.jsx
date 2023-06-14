import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import OrderTable from '../../components/orderDataTable/OrderDataTable'
import './orderslist.scss'


const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <OrderTable />
            </div>
        </div>
    )
}

export default List