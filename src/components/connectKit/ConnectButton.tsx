import { ConnectKitButton } from 'connectkit';
import styled from 'styled-components';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { useGetMembershipData } from '../wagmiHooks/getMembershipData';
import { useAccount } from 'wagmi';

const StyledButton = styled.button`
    font-family:
        'PT Root UI',
        ui-rounded,
        'Nunito',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Helvetica,
        'Apple Color Emoji',
        Arial,
        sans-serif,
        'Segoe UI Emoji',
        'Segoe UI Symbol';
    cursor: pointer;
    margin-left: auto;
    display: inline-flex;
    height: 40px;
    width: initial;
    opacity: 1;
    align-items: center;
    background: #ffffff;
    font-size: 16px;
    font-weight: 700;
    color: #151c3b;
    padding: 0px 14px;
    border-radius: 10px;
    border: 1px solid #f0f0f0; //#151C3B
    box-shadow: inset 0 0 0 1px #d6d8e1;
    &:hover {
        background: #e9ebf3;
        box-shadow: inset 0 0 0 1px #d4d8e8;
    }
`;

export const ConnectButton = () => {
    const { address } = useAccount();

    const { data: tokenId } = NamesRegistryReadHook({
        functionName: 'getNameInCommunityByAddress',
        functionArgs: address
            ? [address.toString() as `0x${string}`, 'eth']
            : ['0x0000000000000000000000000000000000000000', 'eth'],
    }) as { data: bigint | undefined };

    const { membershipData } = useGetMembershipData(tokenId ?? BigInt(0)); // Use BigInt(0) if tokenId is undefined

    const pomEthName =
        membershipData && membershipData.name.length > 0 && membershipData.community.length > 0
            ? membershipData.name + '@' + membershipData.community
            : null;

    //pom eth name is the second option after ens name
    return (
        <div className="connectKitBtn">
            <ConnectKitButton.Custom>
                {({ isConnected, truncatedAddress, show, ensName }) => {
                    return (
                        <StyledButton onClick={show}>
                            {isConnected
                                ? (ensName ?? pomEthName ?? truncatedAddress)
                                : 'Connect Wallet'}{' '}
                            {/* Use the constant ENS name */}
                        </StyledButton>
                    );
                }}
            </ConnectKitButton.Custom>
        </div>
    );
};
