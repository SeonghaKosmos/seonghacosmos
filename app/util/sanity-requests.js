import { client } from '@/sanity/lib/client'



export async function getSlide(slug) {
    const query = `*[_type == "slide" && slug.current == $slug]`
    const slides = await client.fetch(query, {slug})
    const slide = slides[0]
    return slide
}

export async function getSpheres() {
    const query = `*[_type == "sphere"]`
    const spheres = await client.fetch(query)
    return spheres
}