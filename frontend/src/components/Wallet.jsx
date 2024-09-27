import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";

import { getWalletData } from "./Store";
import Wallpaper from "./layouts/Wallpaper";
import { ProductionAPI as API } from "./layouts/Routes";

const CryptoCard = (props) => {
  return (
    <Card className="flex flex-row justify-center items-center w-full gap-10">
      <CardBody>{props.name || "Network"}</CardBody>
      <CardBody className="w-2/3 truncate">
        {props.address || "Address"}
      </CardBody>
      <CardBody>
        {props.balance || "0"} {props.symbol || "$"}
      </CardBody>
    </Card>
  );
};

export default function Wallet() {
  const [idx, setIdx] = useState(0);
  const [walletStore, setWalletStore] = useState({});
  const [solAccount, setSolAccount] = useState([]);
  const [ethAccount, setEthAccount] = useState([]);

  const fetchWallet = async () => {
    try {
      const data = await getWalletData();
      setWalletStore(data);
    } catch (error) {
      swal("Wallet Error", error.toString(), "error"); // Stringify error for better readability
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    if (walletStore && walletStore.mnemonic) {
      axios
        .post(API.CREATE_WALLET, {
          mnemonic: atob(walletStore.mnemonic),
        })
        .then((response) => {
          const res = response.data.data;
          const solData = res.solWallet.map((item) => item.public_key);
          setSolAccount([...solData]);

          const ethData = res.ethWallet.map((item) => item.public_key);
          setEthAccount([...ethData]);
        })
        .catch((error) => swal("Wallet Error", error.toString(), "error"));
    }
  }, [walletStore]);

  return (
    <>
      <Wallpaper />
      <Card className="w-2/5">
        <CardHeader className="flex justify-between">
          <select
            className="px-5 py-3 rounded-md"
            onChange={(e) => setIdx(Number(e.target.value))}
          >
            <option value="0">Account 1</option>
            <option value="1">Account 2</option>
            <option value="2">Account 3</option>
            <option value="3">Account 4</option>
          </select>
          <div className="text-4xl mx-5">0.00</div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-5 py-10">
          <CryptoCard
            name="Solana"
            address={solAccount[idx]}
            balance="0.0"
            symbol="SOL"
          />
          <CryptoCard
            name="Ethereum"
            address={ethAccount[idx]}
            balance="0.0"
            symbol="ETH"
          />
        </CardBody>
      </Card>
    </>
  );
}
