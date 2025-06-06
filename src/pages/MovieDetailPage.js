import React from 'react';
import { useParams } from 'react-router';

const MovieDetailPage = () => {
    const { id } = useParams();
    return (
        <div>
            Chi tiết phim có ID: {id}
        </div>
    );
};

export default MovieDetailPage;