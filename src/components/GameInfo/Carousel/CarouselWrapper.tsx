import { Grid } from "@material-ui/core";
import React, { useState } from "react"; 
import AliceCarousel from 'react-alice-carousel';
import { Movie, Screenshot } from "types";
import { useStyles } from "../GameInfo.styles";
import ReactPlayer from 'react-player';

import '../../../../node_modules/react-alice-carousel/lib/alice-carousel.css';

interface Props {
    screenshots: Screenshot[],
    movies?: Movie[]
}

const CarouselWrapper: React.FC<Props> = ({ screenshots, movies }) => {

    const classes = useStyles();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
    const [Carousel, setCarousel] = useState<any>();

    const responsive: any = {
        0: { items: 5 },
        568: { items: 10 },
        1024: { items: 10 },
    };
    
    const slideTo = (i: any) => { setCurrentIndex(i); setCurrentPlayingId(null); };
    const thumbItem = (item: any, i: any) => (<img onClick={() => slideTo(i)} className={classes.thumbnail} src={screenshots[i].path_full} alt="Screenshot" onDragStart={handleDragStart} />);
    let thumbVideos;

    if (movies) {
        thumbVideos = (item: any, i: any) => (<img onClick={() => slideTo(i)} className={classes.thumbnail} src={movies[i].thumbnail} alt="Screenshot" onDragStart={handleDragStart} />);
    }

    const handleDragStart = (e: any) => e.preventDefault();
    const onSlideChanged = (e: any) => { setCurrentIndex(e.item); }

    const items: any = screenshots?.map((screenshot: Screenshot) => (
        <img 
            className={classes.carouselImage} 
            src={screenshot.path_full} 
            alt="Screenshot" 
            onDragStart={handleDragStart} 
        />
    ));

    const videos: any = movies?.map((movie: Movie) => (
        <div onDragStart={handleDragStart}>
            <ReactPlayer 
                playing={movie.id === currentPlayingId} 
                controls={true} 
                url={movie.webm[480]} 
                onPlay={() => { setCurrentPlayingId(movie.id); }}
                onPause={() => { setCurrentPlayingId(null); }} 
            />
        </div>
    ));

    return (
        <Grid container className={classes.carouselContainer}>
            <Grid item xs={12} md={12}>
                <AliceCarousel 
                    mouseTracking
                    infinite
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    activeIndex={currentIndex}
                    onSlideChanged={onSlideChanged}
                    items={videos}
                    ref={(el) => { setCarousel(el) }}
                />
            </Grid>

            <Grid className={classes.thumbnailContainer} container>
                <AliceCarousel
                    mouseTracking
                    disableButtonsControls={true}
                    disableDotsControls={true}
                    responsive={responsive}
                    items={videos.map(thumbItem)}
                />
            </Grid>
        </Grid>
        
    )
}

export default CarouselWrapper;
