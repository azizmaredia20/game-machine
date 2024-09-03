import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Home: React.FC<HomeProps> = (_props) => {

    const [count, setCount] = useState(0)
    const data = useLoaderData()

    return (
        <>
            <div className="card">
                Home Page
            </div>
        </>
    )
}

interface HomeProps {
    [key: string]: any
}

export default Home;