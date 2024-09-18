import { ConnectKitButton } from "connectkit";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "PT Root UI", ui-rounded, "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  cursor: pointer;
  margin-left: auto;
  display: inline-flex;
  height: 40px;
  opacity: 1;
  align-items: center;
  background: #ffffff;
  font-size: 16px;
  font-weight: 700;
  color: #151C3B;
  padding: 0px 14px;
  border-radius: 10px;
  border: 1px solid #F0F0F0; //#151C3B
  box-shadow: inset 0 0 0 1px #D6D8E1;
  &:hover {
    background: #E9EBF3;
    box-shadow: inset 0 0 0 1px #D4D8E8;
  }
`;

export const ConnectButton = () => {
  return (
    <div className="connectKitBtn">
    <ConnectKitButton.Custom>
      {({ isConnected, truncatedAddress,show, }) => {
        return (

          <StyledButton onClick={show}>
            {isConnected ?  truncatedAddress: "Connect Wallet"} {/* Use the constant ENS name */}
          </StyledButton>
        );
      }}
    </ConnectKitButton.Custom>
    </div>
  );
};
