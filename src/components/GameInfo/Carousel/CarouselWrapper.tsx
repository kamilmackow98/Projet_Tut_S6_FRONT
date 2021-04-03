import { Grid } from "@material-ui/core";
import React, { useState } from "react"; 
import AliceCarousel from 'react-alice-carousel';
import { Screenshot } from "types";
import { useStyles } from "../GameInfo.styles";

import '../../../../node_modules/react-alice-carousel/lib/alice-carousel.css';

interface Props {
    screenshots: Screenshot[]
}

const CarouselWrapper: React.FC<Props> = ({ screenshots }) => {

    const classes = useStyles();
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [Carousel, setCarousel] = useState<any>();

    const responsive: any = {
        0: { items: 5 },
        568: { items: 10 },
        1024: { items: 10 },
    };
    
    const slideTo = (i: any) => { setCurrentIndex(i) };
    const thumbItem = (item: any, i: any) => (<img onClick={() => slideTo(i)} className={classes.thumbnail} src={screenshots[i].path_full} alt="test" onDragStart={handleDragStart} />);
    
    const handleDragStart = (e: any) => e.preventDefault();
    const onSlideChanged = (e: any) => { setCurrentIndex(e.item); }

    const items: any = screenshots.map((screenshot: Screenshot) => <div><img className={classes.carouselImage} src={screenshot.path_full} alt="test" onDragStart={handleDragStart} /></div>)

    return (
        <Grid container className={classes.carouselContainer}>
            <Grid item xs={12} md={12}>
                <AliceCarousel 
                    mouseTracking
                    autoPlay
                    autoPlayInterval={5000}
                    infinite
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    activeIndex={currentIndex}
                    onSlideChanged={onSlideChanged}
                    items={items}
                    ref={(el) => { setCarousel(el) }}
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
