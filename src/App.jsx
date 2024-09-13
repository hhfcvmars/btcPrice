import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import CoinDetail from './CoinDetail'

function App() {
  const [marketData, setMarketData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://www.okx.com/api/v5/market/tickers?instType=SPOT&instId=BTC-USDT,ETH-USDT,LTC-USDT,XRP-USDT,DOT-USDT,DOGE-USDT,ADA-USDT,SOL-USDT,MATIC-USDT,LINK-USDT')
        const data = await response.json()
        const sortedData = data.data
          .map(item => ({
            ...item,
            volume24hUSDT: parseFloat(item.volCcy24h),
            priceChangePercent: ((parseFloat(item.last) - parseFloat(item.open24h)) / parseFloat(item.open24h) * 100).toFixed(2)
          }))
          .sort((a, b) => b.volume24hUSDT - a.volume24hUSDT)
        setMarketData(sortedData.slice(0, 100)) // 只显示前20个数据
      } catch (error) {
        console.error('获取行情数据失败:', error)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 10000) // 每10秒更新一次数据

    return () => clearInterval(interval)
  }, [])

  const filteredMarketData = marketData.filter(item =>
    item.instId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={
        <>
      <h1 className="title">OKX 行情列表</h1>
      <input
        type="text"
        placeholder="搜索币名..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="table-container">
        <table className="market-table">
          <thead>
            <tr>
              <th>交易对</th>
              <th>最新价格</th>
              <th>24小时高</th>
              <th>24小时低</th>
              <th>24小时涨跌幅</th>
              <th>24小时成交量</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarketData.map((item) => (
              <tr key={item.instId}>
                <td className="pair">
                <Link to={`/coin/${item.instId}`}>{item.instId}</Link>
                </td>
                <td>{item.last}</td>
                <td>{item.high24h}</td>
                <td>{item.low24h}</td>
                <td className={parseFloat(item.priceChangePercent) >= 0 ? "up" : "down"}>
                  {item.priceChangePercent}%
                </td>
                <td>{parseFloat(item.vol24h).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
          </table>
              </div>
            </>
          } />
      <Route path="/coin/:instId" element={<CoinDetail />} />
      </Routes>
    </div>
  )
}

export default App