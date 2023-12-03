import { useState } from "react";
import { useSelector } from "react-redux";



export default function useLoadContent(loaderFunction, params) {

    let slug

    if (params.length > 0) {
        slug = params[0]
    } else {
        slug = 'the-extremley-long-slug-that-will-never-be-used'
    }

    const preloadedContent = useSelector((state) => state.app.slides[slug])

    const [content, setContent] = useState()

    async function loadContent() {
        const content = await loaderFunction(...params)
        setContent(content)
    }
    
    if (!preloadedContent) {
        loadContent()
    } else if (!content){
        setContent(preloadedContent)
    }

    return [content, setContent]
}
