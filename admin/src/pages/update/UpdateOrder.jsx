import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './updateorder.scss'


const UpdateOrder = ({ inputs, title }) => {
    const { orderId } = useParams();

    const [orderData, setOrderData] = useState({});

    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/order/${orderId}`);
                setOrderData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [orderId]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/order/${orderId}`, orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setIsModalOpen(<p className='notify-added-product'>Update product successfully!</p>);
            } else if (response.status === 404) {
                setIsModalOpen(<p className='notify-added-product'>Product info is not found!</p>);
            }
            else {
                setIsModalOpen(<p className='notify-added-product'>Something error. Try again!</p>)
            }
        } catch (error) {
            setIsModalOpen(<p className='notify-added-product'>Something error. Try again!</p>)
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1 className="newTitle">{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            {inputs.map((input) => {
                                return (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        {input.value ?
                                            (
                                                <div>
                                                    <select name={input.name} onChange={handleChange}>
                                                        <option value={orderData[input.name]}>{orderData[input.name] + '' || ''}</option>
                                                        {input.value.map((item) =>
                                                            (orderData[input.name] !== item[input.name]) ?
                                                                <option value={item[input.name]} key={item._id}>{item[input.name] + ''}</option> : null
                                                        )}
                                                    </select>
                                                </div>
                                            ) : (<input name={input.name} type={input.type} value={orderData[input.name] || ''} required
                                                disabled={input['disabled'] || false}
                                                onChange={handleChange} />)}
                                    </div>
                                )
                            })}
                            <button className="formInput" >Send</button>
                        </form>
                        {isModalOpen}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UpdateOrder