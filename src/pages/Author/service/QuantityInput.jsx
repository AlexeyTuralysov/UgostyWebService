
import '../../../app/styles/widgets/inputs/TextArea.scss'

export default function QuantityInput({ selectedItem, value, onChange, min = 1, max = 99 }) {

   
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        
        if (newValue >= min && newValue <= max) {
            onChange(newValue); 
        }

    };
    return (
        <>
            <input
                className="count input_number"
                type="number"
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                placeholder={` ${selectedItem}`}
            />

        </>
    )
}
