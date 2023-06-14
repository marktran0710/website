import Home from './pages/home/Home'
import Login from './pages/login/Login'
import UsersList from './pages/usersList/UsersList'
import ProductsList from './pages/productsList/ProductsList'
import OrdersList from './pages/ordersList/OrdersList'
import Single from './pages/single/Single'
import Stats from './pages/stats/Stats'
import New from './pages/new/New'
import UpdateProduct from './pages/update/UpdateProduct'
import UpdateOrder from './pages/update/UpdateOrder'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { userInputs, productInputs, orderInputs } from './formSource'
import './style/dark.scss'
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import axios from 'axios';



function App() {

  const { darkMode } = useContext(DarkModeContext);

  const [products, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getproducts');
        const modifiedData = response.data.map(row => ({
          ...row,
          id: row.article_id // Sử dụng trường productId làm id duy nhất
        }));
        setData(modifiedData) // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="stats" element={<Stats />} />
            <Route path='users'>
              <Route index element={<UsersList />} />
            </Route>
            <Route path='orders'>
              <Route index element={<OrdersList />} />
              <Route
                path="update/:orderId"
                element={<UpdateOrder inputs={orderInputs} title="Update order" />}
              />
            </Route>
            <Route path='products'>
              <Route index element={<ProductsList />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add new product" />}
              />
              <Route
                path="update/:productId"
                element={<UpdateProduct inputs={productInputs} title="Update product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
