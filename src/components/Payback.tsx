import { useState, useEffect } from "react";
import { useAccount } from "../AccountContext";
import { PaybackButton } from "./PaybackButton";
import { CustomSelect } from "./CustomSelect";

const HelloTokenSection = () => {
  const { accounts, selectedAccount } = useAccount();
  const [enableButtons, setEnableButtons] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      setEnableButtons(true);
    } else {
      setEnableButtons(false);
    }
  }, [accounts]);

  return (
    <>

      <div className="hello-token-container">
        <div className="hello-token-left-col">
          <h1>Payback</h1>  
          <PaybackButton
            selectedAccount={selectedAccount}
            enableButtons={enableButtons}
          />
        </div>
      </div>
    </>
  );
};

export default HelloTokenSection;
