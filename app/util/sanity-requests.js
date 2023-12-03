import { client } from '@/sanity/lib/client'


export function getPathName(sphere, slideSlug){
    if (slideSlug === sphere) {
        return `/${slideSlug}`
    } else {
        return `/${sphere}/${slideSlug}`
    }
}

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




export async function getSphereSlides(slug, slides = [], returnFields = []) {


    let returnFieldsString = ''

    if (slides.length > 0){
        returnFieldsString = '{'+returnFields.join(', ')+'}'
    }

    if (returnFieldsString == '{}'){
        returnFieldsString = ''
    }

    function addIfNotDuplicate(slideList) {
        for (const slide of slideList) {
            if (!slides.map((slide) => slide.slug.current).includes(slide.slug.current)) {
                slides.push(slide)
            }
        }
    }

    const querySingle = `*[_type == "slide" && slug.current == $slug]${returnFieldsString}`
    const result = await client.fetch(querySingle, { slug })
    const parentSlide = result[0]


    addIfNotDuplicate([parentSlide])

    const children = parentSlide.children




    if (children) {
        // console.log('children', children)
        const query = `*[_type == "slide" && slug.current in $children]${returnFieldsString}`
        const childSlides = await client.fetch(query, { children })


        for (const child of childSlides) {
            const dummy = await getSphereSlides(child.slug.current, slides, returnFields)
        }

        addIfNotDuplicate(childSlides)
        
    }


    return slides

}