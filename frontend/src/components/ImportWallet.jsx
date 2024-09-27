import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { saveMnemonic, getWalletData } from "./Store";
import { ProductionAPI as API } from "./layouts/Routes";

/*
 * getWalletData()
 * Use this function to retrieve wallet data from the store
 *
 * @example
 *   const walletData = await getWalletData();
 *   console.log(walletData);
 *
 * @output
 *    {
 *       email: "user@example.com",
 *       password: "strongpassword123",
 *       mnemonic: "hjsbdhbd Random Encrypted Mnemonic"
 *    }
 */

/*
  * saveMnemonic({mnemonic : string})

  * Use this function when you need to add/update Mnemonic to store
  * 
  * @example
  *   const mnemonic = "hjsbdhbd Random Encrypted Mnemonic"
  *   await saveMnemonic({menmonic});
  *   
  *   @output
  *    {
  *       mnemonic: "hjsbdhbd Random Encrypted Mnemonic"
  *    }

*/

export default function ImportWallet() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let walletStore = null;

  const loadWallet = async () => {
    walletStore = await getWalletData(); // Refer Line 11
  };
  loadWallet();

  const updateWallet = async (mnemonic) => {
    const storeData = await saveMnemonic({ mnemonic }); // Refer Line 27
  };

  const handleImport = async (data) => {
    setLoad(true);
    try {
      let mnemonic = Object.values(data);
      if (mnemonic.some((item) => item === "")) {
        swal("Error", "All words are Required", "warning");
        setLoad(false);
        return;
      }
      mnemonic = mnemonic.join(" ");
      axios
        .post(API.VERIFY_MNEMONIC, {
          mnemonic: mnemonic,
        })
        .then((res) => {
          console.log("inside the res");
          const encryptedMnemonic = CryptoJS.AES.encrypt(
            mnemonic,
            "Sameer@20"
          ).toString();
          updateWallet(encryptedMnemonic);
          swal("success", res.data.msg, "success");
          return navigate("/app/wallet");
        })
        .catch((err) =>
          swal("Error", err.response?.data?.msg || "Request failed", "error")
        );
    } catch (error) {
      swal("Error", error, "warning");
    }

    setTimeout(() => {
      setLoad(false);
    }, 1000);

    reset();
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <span className="text-2xl my-5">Import your Secret Phase from here</span>
      <div className="flex flex-col bg-zinc-800 justify-center items-center w-2/3 h-2/3 rounded-xl">
        <form className="grid grid-cols-4 grid-rows-3 gap-4 w-full h-2/3 ml-12">
          <span>
            <input
              type="text"
              placeholder="1"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("1")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="2"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("2")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="3"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("3")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="4"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("4")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="5"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("5")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="6"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("6")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="7"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("7")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="8"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("8")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="9"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("9")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="10"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("10")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="11"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("11")}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="12"
              className="w-2/3 h-12 rounded-xl pl-5"
              {...register("12")}
            />
          </span>
        </form>

        <Button
          color="primary"
          variant="shadow"
          size="lg"
          className="mb-5 w-1/4"
          isLoading={load}
          onClick={handleSubmit(handleImport)}
        >
          Import
        </Button>
      </div>
    </div>
  );
}
