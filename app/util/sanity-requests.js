import { client } from '@/sanity/lib/client'


export async function getSlide(slug) {
    const query = `*[_type == "slide" && slug.current == $slug]`
    const slides = await client.fetch(query, { slug })
    const slide = slides[0]
    return slide
}

export async function getSphereSlide(sphereSlug) {

    let returnVal = 'unknown'

    await getSphereSlugs().then((slugs) => {

        slugs = slugs.map((slug) => slug.slug.current)

        if (!slugs.includes(sphereSlug)){
            console.log('sphereSlug not found in sphereSlugs')
            returnVal = null
        }
    })

    if (returnVal == null){
        return null
    }

    return getSlide(sphereSlug)
}

export async function getSpheres() {
    const query = `*[_type == "sphere"]`
    const spheres = await client.fetch(query)
    return spheres
}

export function getSphereSlugs() {
    const query = `*[_type == "sphere"]{slug}`
    return client.fetch(query)
}




export async function getSphereSlides(slug, slides = []) {

    function addIfNotDuplicate(slideList) {
        for (const slide of slideList) {
            if (!slides.map((slide) => slide.slug.current).includes(slide.slug.current)) {
                slides.push(slide)
            }
        }
    }

    const querySingle = `*[_type == "slide" && slug.current == $slug]{slug, children}`
    const result = await client.fetch(querySingle, { slug })
    const parentSlide = result[0]


    addIfNotDuplicate([parentSlide])

    const children = parentSlide.children




    if (children) {
        // console.log('children', children)
        const query = `*[_type == "slide" && slug.current in $children]{slug, children}`
        const childSlides = await client.fetch(query, { children })


        for (const child of childSlides) {
            const dummy = await getSphereSlides(child.slug.current, slides)
        }

        addIfNotDuplicate(childSlides)
        
    }


    return slides

}