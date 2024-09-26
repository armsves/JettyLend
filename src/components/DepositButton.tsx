import { useState } from "react";
import { useSendTransaction } from "../hooks/useSendTransaction";
import { componentAddress } from "../constants";

export const DepositButton = ({ selectedAccount, enableButtons }: { selectedAccount: string; enableButtons: boolean; }) => {
  const [loading, setLoading] = useState(false);

  const sendTransaction = useSendTransaction();

  const handleClaimToken = async () => {
    console.log("selectedAccount:", selectedAccount);
    if (!selectedAccount) {
      alert("Please select an account first.");
      return;
    }
    setLoading(true);
    const accountAddress = selectedAccount;

    /*
    const manifest = `
      CALL_METHOD
        Address("${componentAddress}")
        "free_token"
        ;
      CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
        ;
    `;
    */

    /* */
    const my_account = "account_tdx_2_128uyf70ypq0rck0zsd62zafge280vtv6l6vjlumnpud5arxsfg7732";
    const my_pool = "account_tdx_2_12yrpw3958zfqq7swxcgw5hau97xm8azde9pu5w7sv83ea4skauvrtp";
    const HT = "resource_tdx_2_1t4js3g07vq5w5r06v87pfd8jrypx5m4wujhl6k85fnl2xt4ymruspl";
    const manifest = `
      CALL_METHOD
        Address("${my_account}")
        "withdraw"
        Address("${HT}")
        Decimal("1");

      CALL_METHOD
        Address("${my_pool}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP");
      `;
    /* */
    console.log("manifest:", manifest);

    const result = await sendTransaction(manifest).finally(() =>
      setLoading(false)
    );
    console.log("transaction receipt:", result?.receipt);
  };

  return (
    <button
      id="get-hello-token"
      onClick={handleClaimToken}
      disabled={!selectedAccount || !enableButtons}
      className={loading ? "loading" : ""}>
      Deposit into Pool
    </button>
  );
};
