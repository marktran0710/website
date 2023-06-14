import "./home.scss";
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from "../../components/widget/Widget";
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'

import { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/dashboard');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" amount={data.users} />
          <Widget type="orders" amount={data.orders} />
          <Widget type="earning" amount={data.earning} />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Statistics of the year 2023" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions
          </div>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
