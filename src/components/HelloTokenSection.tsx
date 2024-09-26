import { useState, useEffect } from "react";
import { useAccount } from "../AccountContext";
import { ClaimHello } from "./ClaimHello";
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
          <CustomSelect
            active={active}
            setActive={setActive}
            enableButtons={enableButtons}
          />
          <ClaimHello
            selectedAccount={selectedAccount}
            enableButtons={enableButtons}
          />
        </div>
        <div className="hello-tokens-img-container">
          <div
            className="vertical-bar"
            style={{
              width: 0,
              height: "60%",
              opacity: 0.3,
              borderLeft: "1px solid white",
            }}
          />
          <div className="hello-tokens">
            <img src="src/assets/hello-tokens.png" alt="hello tokens" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HelloTokenSection;
