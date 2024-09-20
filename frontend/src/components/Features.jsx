import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { motion } from 'framer-motion'
import bitcoin from '../media/bitcoin.jpg';
import matic from '../media/matic.webp';
import solana from '../media/solana.jpg';
import ethereum from '../media/ethereum.jpeg';

import '../styles/feature.css'

const MarqueeCard = (props) => {
    return (

        <Card
            isFooterBlurred
            radius="lg"
            className='hover:scale-[1.1] hover:shadow-indigo-500/40'
        >
            <Image
                className="object-cover"
                height={200}
                src={props.image}
                width={200}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{props.content || 'Available Soon'} </p>
            </CardFooter>
        </Card>

    )
}
export default function Features() {
    return (
        <div className="w-full h-[50vh] bg-zinc-50 flex flex-row items-center justify-start px-40">
        </div>
 )
}
