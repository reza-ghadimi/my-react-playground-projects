import './InvestmentInputForm.css'
import Input from '../Input/Input.jsx'

export default function InvestmentInputForm({ investmentValues, onChange }) {
    return (
        <div className="grid-container">
            <Input type='number' label='Initial Investment' required={true}
                initialValue={investmentValues.initialInvestment}
                onChange={(e) => onChange({ value: e, field: 'initialInvestment' })}
            />

            <Input type='number' label='Annual Investment' required={true}
                initialValue={investmentValues.annualInvestment}
                onChange={(e) => onChange({ value: e, field: 'annualInvestment' })}
            />

            <Input type='number' label='Expected Return' required={true}
                initialValue={investmentValues.expectedReturn}
                onChange={(e) => onChange({ value: e, field: 'expectedReturn' })}
            />

            <Input type='number' label='Duration' required={true}
                initialValue={investmentValues.duration}
                onChange={(e) => onChange({ value: e, field: 'duration' })}
            />
        </div>
    );
}