import { useEffect, useRef, useState } from "react"
import { getSphereSlides } from "../util/sanity-requests"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import './table-of-contents.css'
import { appSliceActions } from "@/redux/store"
import { usePathname } from "next/navigation"


function getTocElementStyleClass(depth) {
    switch (depth) {
        case 0:
            return 'h2 sphere-title'
        case 1:
            return 'h3 toc-h3'
        case 2:
            return 'h4 toc-h4'
        case 3:
            return 'h5 toc-h5'
        case 4:
            return 'h6 toc-h6'
        default:
            return 'h6 toc-h6'
    }

}

export default function TableOfContents({ sphere }) {

    const pathName = usePathname()
    const theSlides = useSelector((state) => state.app.slidesInfo)
    const titleDims = useSelector((state) => state.app.TitleDims)
    const isTOCVisible = useSelector((state) => state.app.isTOCVisible)
    const dispatch = useDispatch()
    const TOCVisibilityClass = isTOCVisible ? 'toc-visible' : 'toc-invisible'
    const marginTop = titleDims ? titleDims.height : 0


    const titleThumbnailsDiv = useRef()


    function getPrefix(slug) {
        return sphere == slug ? '' : `/${sphere}`
    }




    function titlesForEach(func) {
        const titles = Array.from(titleThumbnailsDiv.current.children)
        titles.forEach(title => func(title.children[0]))
    }



    function highlightOnNav() {

        const pathNameParts = pathName.split('/')
        const slug = pathNameParts[2]

        const title = pathNameParts.length < 3
            ?
            document.querySelector(`a[href="/${sphere}"]`)
            :
            document.querySelector(`a[href="/${sphere}/${slug}"]`)

        console.log(title)
        if (title) {
            titlesForEach((a) => {
                a.style.fontWeight = 'normal'
            })
            title.style.fontWeight = 'bold'
        }

    }

    useEffect(() => highlightOnNav(), [pathName])

    useEffect(() => {


        getSphereSlides(sphere, [], ['slug', 'title', 'index', 'depth', 'children']).then((slides) => {

            slides = slides.sort((a, b) => a.index - b.index)
            dispatch(appSliceActions.setSlidesInfo(slides))
        })


    }, [])







    return (
        <div className={`toc-container toc-container-margin-controller ${TOCVisibilityClass}`} style={{ marginTop: `${marginTop}px` }}>
            <h3 className="toc-title">Table of Contents</h3>

            <div className="title-thumbnails-div" ref={titleThumbnailsDiv}>
                {theSlides.map(({ slug, title, depth }) => {



                    const fontSize = `calc((1.325rem + .9vw)*${0.8 ** (depth)})`
                    const indentation = `${depth * 2}rem`
                    return (

                        <div
                            className="toc-item"
                            style={{
                                fontSize: fontSize,
                                marginLeft: indentation,
                            }}
                            key={slug.current}
                        >
                            <Link
                                href={`${getPrefix(slug.current)}/${slug.current}`}
                                key={slug.current}
                            >
                                {title}
                            </Link>

                        </div>

                    )
                })}
            </div>

        </div>
    )
}