import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import CryptoJS from 'crypto-js';
import {getWalletData} from './Store'

const CryptoCard = (props) => {
  return (
    <Card className='flex flex-row justify-around w-full'>
      <CardBody>
        {props.name || 'Network'}
      </CardBody>
      <CardBody className='w-2/3 truncate'>
        {props.address || 'Address'}
      </CardBody>
      <CardBody>
        {props.balance || '0'} {props.symbol || '$'}
      </CardBody>
    </Card>
  )
}


export default function Wallet() {
  let storeDetails = null;
  const fetchStore = async () => {
      storeDetails = await getWalletData();
  }
  fetchStore();
  const [account, setAccount] = useState(0);
  const handleAccount = (e) => {
    setAccount(e.target.value)
  }

  useEffect(() => {
      try {
          let mnemonic = CryptoJS.AES.decrypt(storeDetails.mnemonic, 'Sameer@20')
          axios.post("http://localhost:8080/create/wallet",{
                mnemonic : mnemonic,
                index : account
          })
          .then((response) => {
            console.log(response)
            alert("success")
          })
      } catch (error) {
        alert("error")
      }
  },[account])



  return (
    <Card className="w-2/5">
          <CardHeader className="flex justify-between">
                <select className='px-5 py-3 rounded-md' onChange={() => handleAccount()}>
                      <option value="0">Account 1</option>
                      <option value="1">Account 2</option>
                      <option value="2">Account 3</option>
                      <option value="3">Account 4</option>
                </select>
                <div className='text-4xl mx-5'>
                        0.00
                </div>
          </CardHeader>
              <Divider />
          <CardBody>
              <CryptoCard name="solana" address="agfhjs" balance="2" symbol="sol"/>
         </CardBody>
              <Divider />
          <CardFooter>
               <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                  >
                        Visit source code on GitHub.
                </Link>
          </CardFooter>
    </Card>
  )
}
