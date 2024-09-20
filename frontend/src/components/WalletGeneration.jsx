import React, { useState } from 'react'
import { Button } from "@nextui-org/react";
import Wallpaper from "./layouts/Wallpaper"
import "../styles/walletgeneration.css"


export default function WalletGeneration() {
    return (
        <div className='flex flex-col w-full h-screen justify-center items-center wallet-generation'>
            <Wallpaper />
            <div className='flex width-1/5 h-1/5 mt-20 '>
                <span className='h-2 text-gray-200 font-bold tracking-wide text-4xl'>BLOCKVAULT</span>
            </div>
            <div className='flex flex-col gap-10 width-2/5 h-1/5 mt-20 z-10'>
                <Button color="primary" variant="shadow" size='lg'>
                    <a href="/app/wallet/create"> Create Wallet</a>
                </Button>
                <Button color="primary" variant="light" size='lg'>
                    <a href="/app/wallet/import">Import Wallet</a>
                </Button>
            </div>
        </div>
    )
}
