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

    const responsive: any = {
        0: { items: 4 },
        568: { items: 10 },
        1024: { items: 10 },
    };
    
    const slideTo = (i: any) => { setCurrentIndex(i); setCurrentPlayingId(null); };
    const thumbItem = (item: Screenshot | Movie, i: number) => (
        <div className={classes.screenshotContainer}>
            <img 
                onClick={() => slideTo(i)} 
                className={classes.thumbnail} 
                src={(item.hasOwnProperty('path_full')) ? (item as Screenshot).path_full : (item as Movie).thumbnail} 
                alt="Screenshot" 
                onDragStart={handleDragStart} 
            />
        </div>
    );

    const handleDragStart = (e: any) => e.preventDefault();
    const onSlideChanged = (e: any) => { setCurrentIndex(e.item); setCurrentPlayingId(null); }

    const screenshotsJSX: JSX.Element[] = screenshots?.map((screenshot: Screenshot) => (
        <div className={classes.screenshotContainer}>
            <img 
                className={classes.carouselImage} 
                src={screenshot.path_full} 
                alt="Screenshot" 
                onDragStart={handleDragStart} 
            />
        </div>
    ));

    const moviesJSX: JSX.Element[] = movies ? movies.map((movie: Movie) => (
        <div className={classes.playerWrapper} onDragStart={handleDragStart}>
            <ReactPlayer 
                playing={movie.id === currentPlayingId} 
                controls={true} 
                url={movie.webm[480]} 
                className={classes.reactPlayer}
                onPlay={() => { setCurrentPlayingId(movie.id); }}
                onPause={() => { setCurrentPlayingId(null); }} 
            />
        </div>
    )) : [];

    const itemsJSX: JSX.Element[] = moviesJSX.concat(screenshotsJSX);
    let items: Array<Movie | Screenshot> = [];
    if (movies) {
        items = items.concat(movies);
    }
    items = items.concat(screenshots);

    return (
        <Grid container className={classes.carouselContainer}>
            <Grid item xs={12} md={12}>
                <AliceCarousel 
                    disableDotsControls={true}
                    activeIndex={currentIndex}
                    onSlideChanged={onSlideChanged}
                    items={itemsJSX}
                />
            </Grid>

            <Grid className={classes.thumbnailContainer} container>
                <AliceCarousel
                    mouseTracking
                    disableButtonsControls={true}
                    disableDotsControls={true}
                    responsive={responsive}
                    items={items.map(thumbItem)}
                />
            </Grid>
        </Grid>
        
    )
}

export default CarouselWrapper;
