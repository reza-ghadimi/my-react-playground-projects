import './Header.css'
import investmentCacluatorLogo from '../../assets/investment-calculator-logo.png'

export default function Header() {
    return (
        <header id="header">
            <img src={investmentCacluatorLogo} alt='Logo showing a money bag' />
            <h1>React Investment Calculator</h1>
        </header>)
}