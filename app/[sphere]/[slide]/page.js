'use client';


import { getSlide, getSphereSlides } from "@/app/util/sanity-requests";
import Slide from "@/app/components/Slide";
import useLoadContent from "@/app/hooks/useLoadContent";
import { useEffect, useState } from "react";

export default function Home({ params: { sphere, slide } }) {


    const [data, setData] = useLoadContent(getSlide, [slide])
    const [notFound, setNotFound] = useState(false)


    useEffect(() => {
        getSphereSlides(sphere).then((slides) => {

            const slideSlugs = slides.map(slide => slide.slug.current)
            
            if (!slideSlugs.includes(slide)) {
                setNotFound(true)
            }

        })
    }, [])




    let content

    if (notFound) {
        content = <h1 className="container">Not Found</h1>
    } else if (data) {
        content = <Slide data={data} />
    } else {
        content = <h1 className="container">Loading</h1>
    }
    return (
        <>
            {content}
        </>

    )

}