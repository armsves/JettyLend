import { useState, useEffect } from "react";
import { useAccount } from "../AccountContext";
import { BorrowButton } from "./BorrowButton";
import { CustomSelect } from "./CustomSelect";

import {RadixDappToolkit, RadixNetwork, Account} from "@radixdlt/radix-dapp-toolkit";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";

const HelloTokenSection = ( {gatewayApi} : any) => {
  const { accounts, selectedAccount } = useAccount();
  const [enableButtons, setEnableButtons] = useState(false);
  const [active, setActive] = useState(false);
  const [balance, setBalance] = useState(0); 

  useEffect(() => {
    if (accounts.length > 0) {
      setEnableButtons(true);
      getBalance();
    } else {
      setEnableButtons(false);
    }
    if (balance < 1) {
      setEnableButtons(false);
    }

  }, [accounts, balance]);

const getBalance =  async() => {
  const componentDetails = await gatewayApi.state.getEntityDetailsVaultAggregated("account_tdx_2_12yrpw3958zfqq7swxcgw5hau97xm8azde9pu5w7sv83ea4skauvrtp");
  const balance2 = parseFloat(componentDetails.fungible_resources.items[0].vaults.items[0].amount);
  setBalance(balance2);
  console.log("componentDetails: ", accounts);
}

  return (
    <>

      <div className="hello-token-container">
        <div className="hello-token-left-col">
          <h1>Borrowing</h1>
          <p>Pool Available Balance: {balance} HT</p>
          <BorrowButton
            selectedAccount={selectedAccount}
            enableButtons={enableButtons}
          />
        </div>
      </div>
    </>
  );
};

export default HelloTokenSection;
