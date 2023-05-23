import React, { useEffect, useState } from 'react';
import { checkStringLength, removeSource } from '../../../functions';
import { Link } from 'react-router-dom';

export default function TrendingCarousel(props) {

    const [active, setActive] = useState(0);

    useEffect(() => {
        const link = document.createElement('link');

        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';
        link.rel = 'stylesheet';
        link.integrity = 'sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ';
        link.setAttribute('crossorigin', 'anonymous');

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js';
        script.integrity = 'sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe';
        script.setAttribute('crossorigin', 'anonymous');

        document.body.appendChild(link);
        document.body.appendChild(script);
    });

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-inner">
                    {props.trendingNews.map((item, index) => {
                        return (
                            <div
                                className={index === active ?
                                    "carousel-item active" :
                                    "carousel-item"}
                                key={`${index}div`}>
                                <img
                                    src={item.urlToImage ??
                                        `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`}
                                    alt='trending-news'
                                    className="d-block w-100"
                                    key={`${index}img`}
                                    style={{
                                        height: '400px'
                                    }}
                                />
                                <div className="carousel-caption bg-black"
                                    style={{ '--bs-bg-opacity': '.5' }}
                                >
                                    <h5
                                        key={`${index}title`}
                                    >{removeSource(item.title)}</h5>
                                    <p>
                                        {(item.content) ?
                                            <>
                                                {checkStringLength(item.content, 20)}
                                                {' '}<Link href='#'>Read More</Link>
                                            </> : 'No content available'}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev"
                    onClick={() => {
                        if (active === 0) {
                            setActive(props.trendingNews.length - 1);
                        } else {
                            setActive(active - 1);
                        }
                    }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next"
                    onClick={() => {
                        if (active !== props.trendingNews.length - 1) {
                            setActive(active + 1);
                        } else {
                            setActive(0);
                        }
                    }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

