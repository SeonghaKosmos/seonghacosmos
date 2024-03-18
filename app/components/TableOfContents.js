import { useEffect, useRef, useState } from "react"
import { getSphereSlides } from "../util/sanity-requests"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import './table-of-contents.css'
import { appSliceActions } from "@/redux/store"
import { usePathname } from "next/navigation"
import { CSSTransition } from "react-transition-group"



export default function TableOfContents({ sphere }) {

    const pathName = usePathname()
    const theSlides = useSelector((state) => state.app.slidesInfo)
    const isTOCVisible = useSelector((state) => state.app.isTOCVisible)
    const dispatch = useDispatch()



    //sets marginTop and top depending on screen size
    const tocContainer = useRef();

    //toc right below nav when it first appears
    //adjust size of toc window so it is scrollable
    useEffect(() => {
        if (isTOCVisible && tocContainer.current) {
            const nav = document.getElementById('slide-nav')
            const navHeight = nav.getBoundingClientRect().height
            tocContainer.current.style.top = `${navHeight}px`

            const height = document.body.getBoundingClientRect().height
            document.getElementById('toc-window').style.height = `${height}px`
        }
    }, [isTOCVisible, pathName])
    

    let prevScrollY = window.scrollY
    window.addEventListener("scroll", (event) => {
        const deltaX = (window.scrollY - prevScrollY) / 5
        if (tocContainer.current) {
            let theTop = tocContainer.current.style.top
            theTop = parseFloat(theTop.replace('px', ''))
            const nav = document.getElementById('slide-nav')
            const navHeight = nav.getBoundingClientRect().height





            if (deltaX < 0) {

                if (theTop <= navHeight) {
                    tocContainer.current.style.top =
                        `${theTop - deltaX}px`
                } else {
                    tocContainer.current.style.top = `${navHeight}px`
                }
            }
            else {
                const tocContainerHeight = tocContainer.current
                    .getBoundingClientRect().height
                if (theTop >= - tocContainerHeight) {
                    tocContainer.current.style.top =
                        `${theTop - deltaX}px`
                } else {
                    tocContainer.current.style.top = `${- tocContainerHeight}px`
                }

            }

        }

        prevScrollY = window.scrollY;
    })


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

        if (title) {
            titlesForEach((a) => {
                a.style.fontWeight = 'normal'
            })
            title.style.fontWeight = 'bold'
        }

    }

    useEffect(() => highlightOnNav())

    useEffect(() => {


        getSphereSlides(sphere, [], ['slug', 'title', 'index', 'depth', 'children']).then((slides) => {

            slides = slides.sort((a, b) => a.index - b.index)
            dispatch(appSliceActions.setSlidesInfo(slides))
        })

    }, [])







    return (
        <>
            {theSlides.length > 1 &&
                <CSSTransition
                    in={isTOCVisible}
                    timeout={500}
                    classNames={'toc-transition'}
                    unmountOnExit
                    mountOnEnter                    
                >
                    <div className={`toc-container 
                    toc-container-margin-controller`}
                        style={{ top: '0px' }}
                        ref={tocContainer}
                    >
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
                                            className="toc-link"
                                        >
                                            {title}
                                        </Link>

                                    </div>

                                )
                            })}
                        </div>

                    </div>
                </CSSTransition>

            }
        </>


    )
}