import {Grid} from "@material-ui/core";
import ReactCarousel from "react-material-ui-carousel";
import React from "react";

function Carousel(props: any) {

    // array of carousel items (screenshots)
    const carouselItems: JSX.Element[] = []
    for(let i = 0; i < props.screenshots.length; i++) {
        carouselItems.push(
            <CarouselItem
                key={i}
                id={i + 1}
                src={props.screenshots[i].path_thumbnail}
            />
        )
    }

    return (
        <Grid item xs={12} md={6}>
            <ReactCarousel>
                {carouselItems}
            </ReactCarousel>
        </Grid>
    )
}

function CarouselItem(props: any)
{
    return (
        <div>
            <img src={props.src} alt={"Screenshot n°" + props.id} style={{width: '100%'}}/>
        </div>
    )
}

export default Carousel
