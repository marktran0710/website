import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import ProductTable from '../../components/productDataTable/ProductDataTable'
import './productslist.scss'


const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <ProductTable />
            </div>
        </div>
    )
}

export default List