import './App.css'
import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import InvestmentInputForm from './components/InvestmentInputForm/InvestmentInputForm.jsx'
import InvestmentResultsTable from './components/InvestmentResultsTable/InvestmentResultsTable.jsx'

function App() {

  const [investmentValues, setInvestmentValues] = useState({
    duration: 1,
    expectedReturn: 1,
    annualInvestment: 1,
    initialInvestment: 1,
  });

  const isDurationValid = investmentValues.duration > 0;

  function handleChange({ value, field }) {
    setInvestmentValues((prevValues) => ({
      ...prevValues,
      [field]: Number(value),
    }));
  }

  return (
    <div>
      <Header />

      <InvestmentInputForm onChange={handleChange} investmentValues={investmentValues} />
      {isDurationValid == false ? (<p>Please enter valid duration</p>) : (<InvestmentResultsTable investmentValues={investmentValues} />)}
    </div >
  )
}

export default App
