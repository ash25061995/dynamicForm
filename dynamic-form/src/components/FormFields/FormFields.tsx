import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import styles from '../../styles/styles.module.css';

const DynamicForm = () => {
    const [rows, setRows] = useState<Array<any>>([{ text: '', select: '', checkbox: false }]);
    const [errors, setErrors] = useState<Array<any>>([]);

    const handleTextChange = (event: any, index: number) => {
        const { value } = event.target;
        const newRows = [...rows];
        newRows[index].text = value;
        setRows(newRows);
    };

    const handleSelectChange = (event: any, index: number) => {
        const { value } = event.target;
        const newRows = [...rows];
        newRows[index].select = value;
        setRows(newRows);
    };

    const handleCheckboxChange = (event: any, index: number) => {
        const { checked } = event.target;
        const newRows = [...rows];
        newRows[index].checkbox = checked;
        setRows(newRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { text: '', select: '', checkbox: false }]);
    };

    const handleRemoveRow = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };


    const debouncedHandleAddRow = useDebounce(handleAddRow, 100);
    const debouncedHandleRemoveRow = useDebounce(handleRemoveRow, 100);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const newErrors: any = [];
        rows.forEach((row, index) => {
            if (!/^[a-zA-Z0-9]+$/.test(row.text)) {
                newErrors[index] = { text: 'Text should contain only alphanumeric characters.' };
            }
            if (!row.select) {
                newErrors[index] = { select: 'Please select an option.' };
            }
        });
        setErrors(newErrors);
        if (newErrors.length === 0) {
            // Submit the form
            console.log(rows);
            alert('Form submitted successfully!');
            setRows([{ text: '', select: '', checkbox: false }]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {rows.map((row, index) => (
                <div key={index} className={styles.row}>
                    <div>
                        <input
                            type="text"
                            placeholder="Text"
                            value={row.text}
                            onChange={(event) => handleTextChange(event, index)}
                            className={styles.inputField}
                        />
                        {!!errors[index]?.text && <p className={styles.errorMessage}>{errors[index].text}</p>}
                    </div>
                    <div>
                        <select value={row.select} onChange={(event) => handleSelectChange(event, index)} className={styles.dropdown}>
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        {!!errors[index]?.select && <span className={styles.errorMessage}>{errors[index].select}</span>}
                    </div>
                    <label className={styles.customCheckbox}>
                        <input
                            type="checkbox"
                            checked={row.checkbox}
                            onChange={(event) => handleCheckboxChange(event, index)}
                        />
                    </label>
                    <button type='button' onClick={() => debouncedHandleRemoveRow(index)} className={styles.btn}>
                        Remove Row
                    </button>
                </div>
            ))}
            <div className={styles.btnContainer}>
                <button type='button' onClick={debouncedHandleAddRow} className={styles.btn}>
                    Add Row
                </button>
                {!!rows.length && <button type="submit" className={styles.btn}>Submit</button>}
            </div>
        </form>
    );
};

export default DynamicForm;
