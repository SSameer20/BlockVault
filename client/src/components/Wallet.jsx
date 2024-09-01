import React, { useEffect, useState } from 'react';
import '../styles/wallet.css';
import axios from 'axios';
import solana from "../media/solana.png";
import ethereum from "../media/ethereum.png";
import bitcoin from "../media/bitcoin.png";
import polygon from "../media/polygon.png";
import CryptoJS from 'crypto-js';
import {  saveWalletData, getWalletData } from '../store';

export default function Wallet() {
    const fetchLocalWallet = async() => {
        const data = await getWalletData() 
        console.log(data)
    }

    // fetchLocalWallet();


    const [idx, setIdx] = useState(0)
    const [address, setAddress] = useState({
        solana: "address",
        ethereum: "address",
        polygon: "address",
        bitcoin: "address"
    })

    const handleAccount = async(e) => {
        setIdx(e.target.value)
        saveWalletData({walletIndex : idx});
        const wData = await getWalletData();
        console.log(wData)
    }
   
    useEffect(() => {
        try {
            axios.post('http://localhost:8080/create/wallet', {mnemonic : "like fox candy skin process flower canoe mechanic mind fun abstract agree", index: 0})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
               console.log(error.response.data)
            });
        } catch (error) {
            console.log(error)
        }
    }, [idx])
    return (
        <div className='wallet'>
            <div class="card">
                <h5 class="card-header header">
                    <select class="form-select" aria-label="Default select example" onChange={handleAccount}>
                        <option value="0">Account 1</option>
                        <option value="1">Account 2</option>
                        <option value="2">Account 3</option>
                    </select>
                    <div className="head-text">
                        <p class="fs-1">0.00$</p>
                        <p class="fs-6">Balance</p>
                    </div>

                </h5>
                <div class="card-body">
                    <h5 class="card-title action-list">
                        <div class="card action-btn">
                            <span>send</span>
                        </div>
                        <div class="card action-btn">
                            <span>recieve</span>
                        </div>
                    </h5>

                    <h5 class="card-header header">
                        Different Networks
                    </h5>


                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Solana
                            <span class="badge-primary badge-pill">{address["solana"]}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Ethereum
                            <span class="badge-primary">{address["ethereum"]}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Polygon
                            <span class="badge-primary badge-pill">{address["polygon"]}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Bitcoin
                            <span class="badge-primary badge-pill">{address["bitcoin"]}</span>
                        </li>
                    </ul>



                </div>
            </div>
        </div>
    );
}
