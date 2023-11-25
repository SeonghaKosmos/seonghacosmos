import { useState } from "react";



export default function useLoadContent(loaderFunction, params) {

    const [content, setContent] = useState()

    async function loadContent() {
        const content = await loaderFunction(...params)
        setContent(content)
    }
    
    if (!content) {
        loadContent()
    }

    return [content, setContent]
}
