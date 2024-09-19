import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import axios from 'axios'
import './CoinDetail.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function CoinDetail() {
  const [priceData, setPriceData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchBitcoinPrices(year)
  }, [year])

  const fetchBitcoinPrices = async (year) => {
    try {
      const response = await axios.get(`https://www.okex.com/api/v5/market/history-candles`, {
        params: {
          instId: 'BTC-USDT',
          after: `${year}-01-01T00:00:00.000Z`,
          before: `${year + 1}-01-01T00:00:00.000Z`,
          bar: '1D'
        }
      })
      setPriceData(response.data.data.reverse())
    } catch (error) {
      console.error('Error fetching Bitcoin prices:', error)
    }
  }

  const chartData = {
    labels: priceData.map(item => new Date(parseInt(item[0])).toLocaleDateString()),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: priceData.map(item => parseFloat(item[4])),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Bitcoin Price History for ${year}`,
      },
    },
  }

  return (
    <div className="coin-detail">
      <h1>Bitcoin Historical Prices</h1>
      <div className="year-input">
        <label htmlFor="year">Select Year: </label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          min="2009"
          max={new Date().getFullYear()}
        />
      </div>
      {priceData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default CoinDetail