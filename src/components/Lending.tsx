import { useState, useEffect, useContext } from "react";
import { useAccount } from "../AccountContext";
import { DepositButton } from "./DepositButton";

const HelloTokenSection = ({ gatewayApi }: any) => {
  const { accounts, selectedAccount, setSelectedAccount } = useAccount();
  const [enableButtons, setEnableButtons] = useState(false);
  const [active, setActive] = useState(false);
  const [balance, setBalance] = useState(0);

  console.log("gatewayApigatewayApigatewayApi", gatewayApi)
  useEffect(() => {
    if (accounts.length > 0) {
      setEnableButtons(true);
      setSelectedAccount(accounts[0].address)
      getBalance();
      console.log(accounts)
    } else {
      setEnableButtons(false);
    }
  }, [accounts]);

  const getBalance = async () => {
    const componentDetails = await gatewayApi.state.getEntityDetailsVaultAggregated("account_tdx_2_12yrpw3958zfqq7swxcgw5hau97xm8azde9pu5w7sv83ea4skauvrtp");
    const balance2 = parseFloat(componentDetails.fungible_resources.items[0].vaults.items[0].amount);
    setBalance(balance2);
    console.log("componentDetails: ", componentDetails.fungible_resources.items[0].vaults.items[0].amount);
  }

  return (
    <>
      <div className="hello-token-container">
        <div className="hello-token-left-col">
          <h1>Lending Pools</h1>
          <p>Pool Available Balance: {balance} HT</p>
          <DepositButton
            selectedAccount={selectedAccount}
            enableButtons={enableButtons}
          />
        </div>
      </div>
    </>
  );
};

export default HelloTokenSection;
