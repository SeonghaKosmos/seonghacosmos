'use client';


import Slide from "../components/Slide";
import useLoadContent from "../../hooks/useLoadContent";
import { getSphereSlide, getSphereSlides } from "../util/sanity-requests";
import { appSliceActions } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function Home({ params: { sphere } }) {


    const [slide, setSlide] = useLoadContent(getSphereSlide, [sphere])
    const isSlidesLoaded = useRef(false)

    const dispatch = useDispatch()



    if (!isSlidesLoaded.current){
        getSphereSlides(sphere).then((slides) => {
            slides.forEach((slide) => {
                dispatch(appSliceActions.setSlide(slide))
            })
            console.log('%c slides preloaded', 'color: green')
            isSlidesLoaded.current = true
        })
    }




    let content

    switch (slide) {
        case null:
            content = <h1 className="container">Not Found</h1>
            break;
        case undefined:
            content = <h1 className="container">Loading</h1>
            break;
        default:
            content = <Slide data={slide} sphere={sphere}/>
            break;
    }

    return (
        <>
            {content}
        </>

    )

}