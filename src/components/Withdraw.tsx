import { useState, useEffect } from "react";
import { useAccount } from "../AccountContext";
import { WithdrawButton } from "./WithdrawButton";
import { CustomSelect } from "./CustomSelect";

import { RadixDappToolkit, RadixNetwork, Account } from "@radixdlt/radix-dapp-toolkit";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import NftCard from "./NftCard";
import { useSendTransaction } from "../hooks/useSendTransaction";


const HelloTokenSection = ({ gatewayApi }: any) => {
  const { accounts, selectedAccount } = useAccount();
  const [enableButtons, setEnableButtons] = useState(false);
  const [active, setActive] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftsImages, setNftsImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendTransaction = useSendTransaction();

  useEffect(() => {
    if (accounts.length > 0) {
      setEnableButtons(true);
      getBalance();
    } else {
      setEnableButtons(false);
    }
  }, [accounts]);


  const getBalance = async () => {
    const componentDetails = await gatewayApi.state.getEntityDetailsVaultAggregated(accounts[0].address);

    //state.innerClient.stateEntityDetails({stateEntityDetailsRequest:{addresses:[accounts[0].address]},aggregation_level:"Vault",opt_ins:{non_fungible_include_nfids:true}})
    //console.log('componentDetailscomponentDetails', componentDetails)
    //const componentDetails2 = await gatewayApi.state.getEntityMetadata("resource_tdx_2_1nfzxzvlc73247f0n5rqpxrn6hzzhcuq0psr5ckgtkrak8msp2eqpds")
    const balance2 = componentDetails.non_fungible_resources.items;
    console.log('balance2', balance2)


    const detailedItems = await Promise.all(
      balance2.map(async (item: any) => {
        console.log('item.vaults.total_count',item.vaults.items[0].total_count)
        const count = await item.vaults.items[0].total_count;
        console.log(count)
        if (item.vaults.total_count > 0) {
          const detailedItem = await gatewayApi.state.getEntityMetadata(item.resource_address);
          const iconUrlItem = detailedItem.items.find((detail: any) => detail.key === 'icon_url');
          const nameItem = detailedItem.items.find((detail: any) => detail.key === 'name');
          return {
            ...item,
            iconUrl: iconUrlItem ? iconUrlItem.value.typed.value : 'default_image_url.png', // Provide a default image URL if icon_url is not found
            name: nameItem ? nameItem.value.typed.value : 'Unknown Name', // Provide a default name if name is not found
          };
        }
      })
    );


    console.log("detailedItems", detailedItems);
    setNftsImages(detailedItems as any);

    const combinedData = balance2.map((item: any, index: any) => ({
      ...item,
      detailedItem: detailedItems[index],
    }));

    console.log('combinedData', combinedData)

    setNfts(combinedData as any);
  }

  const BurnBabyBurn = async (resource: any) => {
    const my_account = accounts[0].address;
    const manifest = `
    CALL_METHOD
      Address("${my_account}")
      "withdraw"
      Address("${resource}")
      Decimal("1");
          
    TAKE_ALL_FROM_WORKTOP
      Address("${resource}")
      Bucket("xrd_bucket");
    BURN_RESOURCE
      Bucket("xrd_bucket");
    `;

    console.log("manifest:", manifest);

    const result = await sendTransaction(manifest).finally(() =>
      setLoading(false)
    );
    console.log("transaction receipt:", result?.receipt);
  };

  return (
<>
  <div className="hello-token-container">
    <div className="hello-token-left-col">
      <h1>Withdraw / Payback</h1>
      <div className="nft-card-container">
        {nfts && nfts.map((nft: any) => (
          <div className="nft-card" key={nft.resource_address}>
            <NftCard
              key={nft.resource_address}
              id={nft.name}
              resourceAddress={nft.resource_address}
              imageUrl={nft.detailedItem.iconUrl}
            />
            <button className="btn-radix-blue" onClick={() => BurnBabyBurn(nft.resource_address)}>Burn NFT</button>
          </div>
        ))}
      </div>
    </div>
  </div>
</>
  );
};

export default HelloTokenSection;
