'use client';


import { getPathName, getSlide, getSphereSlides } from "@/app/util/sanity-requests";
import Slide from "@/app/components/Slide";
import useLoadContent from "@/hooks/useLoadContent";
import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appSliceActions } from "@/redux/store";
import { usePathname } from "next/navigation";


export default function Home({ params: { sphere, slide } }) {


    const pathName = usePathname()
    const dispatch = useDispatch()
    const [data, setData] = useLoadContent(getSlide, [slide])
    const [notFound, setNotFound] = useState(false)


    useEffect(() => {


        if (getPathName(sphere, slide) !== pathName) {
            setNotFound(true)
        }

    }, [])




    let content

    if (notFound) {
        content = <h1 className="container">Not Found</h1>
    } else if (data) {
        content = <Slide data={data} sphere={sphere} />
    } else {
        content = <h1 className="container">Loading</h1>
    }
    return (
        <>
            {content}
        </>

    )

}