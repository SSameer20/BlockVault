import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import '../styles/feature.css'

const MarqueeCard = () => {
    return (

        <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
        >
            <Image
                className="object-cover"
                height={200}
                src="https://nextui.org/images/hero-card.jpeg"
                width={200}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Available soon.</p>
            </CardFooter>
        </Card>

    )
}
export default function Features() {
    return (
        <div
            className="w-full h-[80vh] bg-inherit flex flex-row gap-20 items-center justify-center px-40 "
            id="feauture"
        >
           
            <MarqueeCard/>
            <MarqueeCard/>
            <MarqueeCard/>
            <MarqueeCard/>

        </div >
    )
}
