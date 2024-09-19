import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import './CoinDetail.css'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function CoinDetail() {

  var message = 'Wizz Wallet is installed!'
  if (typeof window.wizz !== 'undefined') {
    console.log('Wizz Wallet is installed!');
  }else{
    message = "Wizz Wallet is installed"
  }


  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default CoinDetail