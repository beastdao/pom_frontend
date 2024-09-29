import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FetchMembershipsDataAPI } from '../apiBackendComponents/FetchMembershipsDataAPI';
import DeleteName from '../myMembershipsComponents/DeleteName';
import shareButton from '../../images/shareButton.svg';
import { useNavigate } from 'react-router-dom';

interface Metadata {
    image: string;
    name: string;
}

interface MembershipCard {
    tokenAddress: string;
    tokenId: string;
    name: string;
    metadata: Metadata;
}

function MyMemberships() {
    const { address } = useAccount();
    const [membershipData, setMembershipData] = useState<MembershipCard[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const data = await FetchMembershipsDataAPI(address);

            setMembershipData(data);
        }
        fetchData();
    }, [address]);

    const openMetadataInNewTab = ({ metadata }: { metadata: Metadata }) => {
        const jsonMetadata = JSON.stringify(metadata, null, 2);
        const blob = new Blob([jsonMetadata], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Open the metadata in a new tab
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.opener = null;
        }
    };

    const handleShareButtonClick = (nameAtCommunity: string) => {
        navigate(`/${nameAtCommunity}`);
    };

    return (
        <div className="mccc2">
            {membershipData && membershipData && membershipData.length > 0 ? (
                membershipData.map((item, index) => (
                    <Card className="mcCard" key={index} bg="light">
                        <object
                            data={item.metadata.image}
                            type="image/svg+xml"
                            aria-label="PoM card Image"
                        >
                            {/* If data is unavailable, you can provide a placeholder image */}
                            <img src="placeholder.png" alt="Placeholder" />
                        </object>
                        <Card.Body className="mcCard-body">
                            <DeleteName nameAtCommunity={item.metadata.name} />
                            <Button
                                id="noscale"
                                variant="dark"
                                type="button"
                                onClick={() => openMetadataInNewTab(item)}
                            >
                                Metadata
                            </Button>

                            <Button
                                id="noscale"
                                variant="light"
                                type="button"
                                onClick={() => handleShareButtonClick(item.metadata.name)}
                            >
                                <img src={shareButton} />
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No memberships found.</p>
            )}
        </div>
    );
}

export default MyMemberships;
