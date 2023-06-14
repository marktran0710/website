import React from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={"5"} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">420000 vnd</p>
                <p className="desc">Previous transation processing Last payments may not be included</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Users</div>
                        <div className="itemResult negetive">
                            <ExpandMoreIcon fontSize="small" />
                            <div className="resultAmount">$12.4K</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Orders</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize="small" />
                            <div className="resultAmount">$12.4K</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Earning</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize="small" />
                            <div className="resultAmount">$12.4K</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Featured