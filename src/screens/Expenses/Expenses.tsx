import useHelmet from '@hooks/useHelmet';
import React, { useEffect } from 'react';

const Expenses: React.FC<ExpensesProps> = (props) => {
    return (
        <>
            <h1>Expenses Us</h1>
        </>
    )
}

interface ExpensesProps {
    [key: string]: any
}

export default Expenses;