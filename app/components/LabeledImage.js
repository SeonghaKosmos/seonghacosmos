import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import './labeled-image.css'

export default function LabeledImage({ labeledImage: {image, imgDescription, imgDate}, containerClassName}) {


  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(imgDate)
  const [width, height] = [image.width, image.height]

  return (
    <div id={'img'} className={containerClassName}>
      <Image
        src={urlForImage(image).auto("format").url()}
        width={1080}
        height={1080}
        loading="lazy"
        className= " md:max-w-prose rounded-lg labeled-image"
        alt={imgDescription}
      />
      <div className="image-description">
        <small>{date.toLocaleDateString("en-US", dateOptions)}</small>
        <br/>
        {imgDescription}
      </div>
    </div>

  );
}