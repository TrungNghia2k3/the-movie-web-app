import React from 'react';
import { Link, useParams } from 'react-router';

const ShowDetailPage = () => {
    const { id } = useParams();
    return (
        <div>
            Chi tiết show có ID: {id}

            <Link to="/movie/123">Xem phim</Link>
        </div>
    );
};

export default ShowDetailPage;