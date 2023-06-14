import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';

import './updateproduct.scss'



const UpdateProduct = ({ inputs, title }) => {
    const { productId } = useParams();

    // const [product, setProduct] = useState({});

    const [formData, setFormData] = useState({});

    const [error, setError] = useState(null);

    const [file, setFile] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${productId}`);
                // setProduct(response.data);
                setFormData({
                    productDisplayName: response.data['productDisplayName'],
                    detail_desc: response.data['detail_desc'],
                    articleType: response.data['articleType'],
                    price: response.data['price'],
                    subCategory: response.data['subCategory'],
                    mastercategories: response.data['mastercategories'],
                    color: response.data['color'],
                    image: response.data['image']
                })
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [productId]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let fileData = new FormData();
        fileData.append('image', file);
        fileData.append('productDisplayName', formData.productDisplayName);
        fileData.append('detail_desc', formData.detail_desc);
        fileData.append('articleType', formData.articleType);
        fileData.append('price', parseInt(formData.price));
        fileData.append('subCategory', formData.subCategory);
        fileData.append('mastercategories', formData.mastercategories);
        fileData.append('color', formData.color);


        try {
            const response = await axios.post(`http://localhost:8080/product/${productId}`, fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file) : `https://drive.google.com/uc?export=view&id=${formData['image'] || ''}`} alt="" />
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image : <DriveFolderUploadOutlinedIcon className='icon' />
                                </label>
                                <input type="file" id="file" accept=".png, .jpg, .jpeg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>
                            {inputs.map((input) => {
                                return (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        {input.value ?
                                            (
                                                <div>
                                                    <select name={input.name} onChange={handleChange} value="">
                                                        <option >{formData[input.name] || ''}</option>
                                                        {input.value.map((item) => (
                                                            <option value={item.name} key={item._id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : (<input name={input.name} type={input.type} value={formData[input.name] || ''} required
                                                onChange={handleChange} />)}
                                    </div>
                                )
                            })}
                            <button >Send</button>
                        </form>
                        {isModalOpen}
                    </div>
                </div>

            </div >
        </div >
    )
}

export default UpdateProduct