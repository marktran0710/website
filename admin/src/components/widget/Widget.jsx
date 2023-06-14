import React from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import { SportsRugbySharp } from '@mui/icons-material';

const Widget = ({ type, amount }) => {

    let data;

    //temporary
    const diff = 20

    switch (type) {
        case "users":
            data = {
                title: "USER",
                isMoney: false,
                link: "See all users",
                amount: amount,
                icon: <PersonOutlineIcon
                    className="icon"
                    style={{
                        color: "crimson",
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                    }} />
            };
            break;
        case "orders":
            data = {
                title: "ORDER",
                isMoney: false,
                amount: amount,
                link: "See all order",
                icon: <ShoppingCartIcon className="icon" style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                }} />
            };
            break;
        case "earning":
            data = {
                title: "EARNING",
                isMoney: true,
                amount: amount,
                link: "No details",
                icon: <MonetizationOnIcon className="icon" style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }} />
            };
            break;
        default:
            break;
    }



    return (
        <div className="widget">

            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.amount} {data.isMoney && "vnd"} </span>
                <Link to={{ type } === 'earning' ? `/${type}` : '/'} style={{ textDecoration: "none" }} className="link">{data.link} </Link>

            </div >
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div >
    )
}

export default Widget