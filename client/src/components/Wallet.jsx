import React from 'react'
import '../styles/wallet.css'
import solana from "../media/solana.png"
import ethereum from "../media/ethereum.png"
import bitcoin from "../media/bitcoin.png"
import polygon from "../media/polygon.png"

export default function Wallet() {
  return (
    <div className='wallet'>
        <div className="wallet-card">
            <div className="balance">
                <div className="value">$0.00</div>
                <span>Balance</span>
            </div>
            <div className="action">
                <div className="recieve"></div>
                <div className="send"></div>
            </div>

            <div className="crypto-balance">

                <div className="crypto-card">
                    <img src={solana} alt="solana" className='crypto-logo' />
                    <div className="crypt-details">
                        <div className="crypto-name">Solana</div>
                        <div className="crypto-quantity">0 SOL</div>
                    </div>
                    <div className="crypto-value">$0.00</div>
                </div>

                <div className="crypto-card">
                    <img src={ethereum} alt="ethereum" className='crypto-logo' />
                    <div className="crypto-details">
                        <div className="crypto-name">Ethereum</div>
                        <div className="crypto-quantity">0 ETH</div>
                    </div>
                    <div className="crypto-value">$0.00</div>
                </div>


                <div className="crypto-card">
                    <img src={bitcoin} alt="bitcoin" className='crypto-logo' />
                    <div className="crypt-details">
                        <div className="crypto-name">Bitcoin</div>
                        <div className="crypto-quantity">0 BIT</div>
                    </div>
                    <div className="crypto-value">$0.00</div>
                </div>


                <div className="crypto-card">
                    <img src={solana} alt="solana" className='crypto-logo' />
                    <div className="crypt-details">
                        <div className="crypto-name">Solana</div>
                        <div className="crypto-quantity">0 SOL</div>
                    </div>
                    <div className="crypto-value">$0.00</div>
                </div>


            </div>
        </div>
    </div>
  )
}
