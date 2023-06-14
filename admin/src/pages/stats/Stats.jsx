import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import './stats.scss';

const Stats = () => {
    return (
        <div className="stats">
            <Sidebar />
            <div className="statsContainer">
                <Navbar />
                <div className="charts">
                    <Featured />
                    <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions
                    </div>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Stats