import useHelmet from '@hooks/useHelmet';
import React, { useEffect } from 'react';


const Verify: React.FC<VerifyProps> = (props) => {

    const helmet = useHelmet()

    useEffect(() => {
        helmet.setTitle("Verify")
    }, [helmet])

    return (
        <>
            <h1>Verify Page</h1>
        </>
    )
}

interface VerifyProps {
    [key: string]: any
}

export default Verify