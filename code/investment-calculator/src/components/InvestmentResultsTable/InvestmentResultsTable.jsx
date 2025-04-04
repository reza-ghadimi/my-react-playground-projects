import './InvestmentResultsTable.css'
import { formatter, calculateInvestmentResults } from '../../js/investment.js';

export default function InvestmentResultsTable({ investmentValues }) {

    const investmentResults = calculateInvestmentResults({ ...investmentValues });

    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {investmentResults?.map((yearData) => {
                    const totalInvestedAmount = yearData.valueEndOfYear - yearData.totalInterest;

                    return (
                        <tr key={yearData.year}>
                            <td>{yearData.year}</td>
                            <td>{formatter.format(yearData.valueEndOfYear)}</td>
                            <td>{formatter.format(yearData.interest)}</td>
                            <td>{formatter.format(yearData.totalInterest)}</td>
                            <td>{formatter.format(totalInvestedAmount)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}