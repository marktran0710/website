import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';

import './new.scss'



const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(null);


    const [formData, setFormData] = useState({
        productDisplayName: '',
        detail_desc: '',
        articleType: '',
        price: '',
        subCategory: '',
        mastercategories: '',
        color: ''
    });

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
        fileData.append('price', formData.price);
        fileData.append('subCategory', formData.subCategory);
        fileData.append('mastercategories', formData.mastercategories);
        fileData.append('color', formData.color);

        try {
            const response = await axios.post('http://localhost:8080/product', fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setIsModalOpen(<p className='notify-added-product'>Add product successfully!</p>);
                // Phản hồi thành công
                console.log('Yêu cầu POST thành công');
            } else {
                setIsModalOpen(<p className='notify-added-product'>Something error. Try again!</p>)
                console.error('Yêu cầu POST không thành công');
            }
        } catch (error) {
            setIsModalOpen(<p className='notify-added-product'>Something error. Try again!</p>)
            console.error('Đã xảy ra lỗi', error);
        }
    };

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
                        <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
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
                                                    <select name={input.name} onChange={handleChange}>
                                                        <option value="">Default</option>
                                                        {input.value.map((item) => (
                                                            <option value={item.name} key={item._id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : (<input name={input.name} type={input.type} placeholder={input.placeholder}
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

export default New