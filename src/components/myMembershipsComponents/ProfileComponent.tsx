import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GetTokenJsonData } from '../wagmiHooks/GetTokenJsonData';
import errorIcon from '../../images/errorIcon.svg';
import { Helmet } from 'react-helmet';


function decodeString(stringValue:string):string {
  return atob(stringValue.split(',')[1]);
}

const ProfileComponent: React.FC<{nameAtCommunity:string}> = ({nameAtCommunity}) => {

  const {
    data: profileJsonData,
    refetch: profileJsonRefetch,  //probably remove
    isError: profileJsonIsError,
    isLoading: profileJsonIsLoading,
    error: profileJsonError,
  } = GetTokenJsonData(nameAtCommunity);



let decodedProfileJsonData: string = ''; // Initialize as an empty string

 if (!profileJsonIsLoading && !profileJsonIsError && profileJsonData) {
   if (typeof profileJsonData === 'string') {
     // Ensure that profileJsonData is a string before decoding
     decodedProfileJsonData = decodeString(profileJsonData);
   } else {
     console.error('Error decoding profile JSON data. Data is not a string.');
   }
 }


  const parts = nameAtCommunity.split("@");
  const communityValue = parts[parts.length - 1];
  const pageTitle = nameAtCommunity;
  const pageDescription = `Proof Of Membership in ${communityValue}`;

  const openMetadataInNewTab = (metadata:string) => {
    const blob = new Blob([metadata], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Open the metadata in a new tab
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.opener = null;
    }
  };

  return (
    <div className="mccc2">
    <Helmet>
        <title> {pageTitle} </title>
        <meta name="og:description" content={pageDescription}/>
      </Helmet>
      { profileJsonIsLoading ? (
        <p>Loading...</p>
      ) : profileJsonIsError ? (
        <div className="errorInfo">
          <img src={errorIcon} / >
          <p><b>Error:</b> {profileJsonError && 'details' in profileJsonError && typeof profileJsonError.details === 'string' ? profileJsonError.details : 'An error occurred.'}</p>
          </div>
      ) : (typeof profileJsonData === 'string' && (profileJsonData as string).length > 0 ? (
        <div className="center">
        <Card className="pcCard" bg="light">
          <object
            data={JSON.parse(decodedProfileJsonData).image}
            type="image/svg+xml"
            aria-label="PoM card Image"
          >
            <img src="placeholder.png" alt="Placeholder" />
          </object>
          <Card.Body className="mcCard-body">
            <Button id="noscale" variant="dark" type="button" onClick={() => openMetadataInNewTab(decodedProfileJsonData)}>
              Metadata
            </Button>
          </Card.Body>
        </Card>
        <p>Copy the page link to share your membership</p>
        </div>
      ) : null)}

    </div>
  );
}

export default ProfileComponent;
