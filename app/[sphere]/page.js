'use client';


import Slide from "../components/Slide";
import useLoadContent from "../hooks/useLoadContent";
import { getSphereSlide } from "../util/sanity-requests";

export default function Home({ params: { sphere } }) {


    const [slide, setSlide] = useLoadContent(getSphereSlide, [sphere])


    let content

    switch (slide) {
        case null:
            content = <h1 className="container">Not Found</h1>
            break;
        case undefined:
            content = <h1 className="container">Loading</h1>
            break;
        default:
            content = <Slide data={slide} />
            break;
    }

    return (
        <>
            {content}
        </>

    )

}