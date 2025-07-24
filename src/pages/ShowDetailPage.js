import React from 'react';
import { Link, useParams } from 'react-router';

const ShowDetailPage = () => {
    const { id } = useParams();
    return (
        <div>
            Show detail page with ID: {id}

            <Link to="/movie/123">Movie detail page</Link>
        </div>
    );
};

export default ShowDetailPage;