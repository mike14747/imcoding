import React, { useContext, useEffect } from 'react';
import CurrentSlugContext from '../../context/currentSlugContext';

const Home = () => {
    const { setCurrentSlug } = useContext(CurrentSlugContext);

    useEffect(() => {
        setCurrentSlug(null);
    }, [setCurrentSlug]);

    return (
        <div>
            <h1>This is the homepage!</h1>
        </div>
    );
};

export default Home;
