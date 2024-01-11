import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { Community,FetchRecentCommunities } from '../apiBackendComponents/FetchRecentCommunities';
import {getValidationConditions} from '../utils/inputValidationConditions';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

//no function isCommunityAvailable that returns bool
function checkCommunity(textData: string) {
  const feedback = textData === "0x0000000000000000000000000000000000000000"
    ? 'Community is not registered. "Create community" ->'
    : 'Community exists';
  const validity = textData === "0x0000000000000000000000000000000000000000"
    ? 'isInvalid'
    : 'isValid';
  return [feedback, validity];
}

function checkName(textData: boolean) {
  const feedback = textData
    ? 'Name is available for registration in this community'
    : 'Name is already taken in this community';
  const validity = textData ? 'isValid' : 'isInvalid';
  const buttonStatus = textData ? '' : 'disabled';
  return [feedback, validity, buttonStatus];
}


function NameSearch() {

  const [nameValue, setNameValue] = useState<string>('');
  const [communityValue, setCommunityValue] = useState<string>('');
  const [nameFeedbackText, setNameFeedbackText] = useState<string>('');
  const [communityFeedbackText, setCommunityFeedbackText] = useState<string>('');
  const [nameValidity, setNameValidity] = useState<string | null>(null);
  const [communityValidity, setCommunityValidity] = useState<string | null>(null);
  const [buttonStatus, setButtonStatus] = useState<string>('disabled');
  const [recentCommunities, setRecentCommunities] = useState<Community[]|null>(null); //rewrite type
  const navigate = useNavigate();

  const {
    data:dataCommunity,
    refetch:refetchCommunity,
    isError:isErrorCommunity,
    isLoading:isLoadingCommunity,
  } = NamesRegistryReadHook({functionName:'getCommunityAdmin',functionArgs:[communityValue]});

  const {
    data: dataName,
    refetch: refetchName,
    isError: isErrorName,
    isLoading: isLoadingName,
  } = NamesRegistryReadHook({functionName:'availableName',functionArgs:[nameValue,communityValue]});


  useEffect(() => {
    async function fetchData() {
      const data = await FetchRecentCommunities();
      setRecentCommunities(data);
    }
    fetchData();
  }, []);


  useEffect(() => {
    setCommunityFeedbackText('');
    setCommunityValidity(null);

    const communityValidationConditions = getValidationConditions(communityValue,  3, 10);
    let matchingConditionCommunity = null;

    if (communityValidationConditions!== null) {
       matchingConditionCommunity = communityValidationConditions.find((condition) => condition.condition);
    }

    if (matchingConditionCommunity) {
      setCommunityFeedbackText(matchingConditionCommunity.feedbackText);
      setCommunityValidity(matchingConditionCommunity.inputValidity);
      setButtonStatus(matchingConditionCommunity.buttonStatus);
    } else if (dataCommunity !== undefined) {
        let [status, validity] = checkCommunity(dataCommunity.toString());
        setCommunityFeedbackText(status);
        setCommunityValidity(validity);
  }
}, [communityValue,isLoadingCommunity]);


useEffect(() => {
  setNameFeedbackText('');
  setNameValidity(null);

  const nameValidationConditions = getValidationConditions(nameValue,  3, 15);
  let matchingConditionName = null;

  if (nameValidationConditions!== null) {
     matchingConditionName = nameValidationConditions.find((condition) => condition.condition);
  }

  if (matchingConditionName) {
    setNameFeedbackText(matchingConditionName.feedbackText);
    setNameValidity(matchingConditionName.inputValidity);
    setButtonStatus(matchingConditionName.buttonStatus);

  } else if (dataName !== undefined && communityValidity==="isValid") {
      let [status, validity, buttonStatus] = checkName(Boolean(dataName));
      setNameFeedbackText(status);
      setNameValidity(validity);
      setButtonStatus(buttonStatus);
  }

}, [nameValue,communityValue,communityValidity,isLoadingName]);


const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputNameValue = event.target.value;
  setNameValue(inputNameValue.toLowerCase());
};

const handleCommunityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputCommunityValue = event.target.value;
  setCommunityValue(inputCommunityValue.toLowerCase());
};

const handleButtonClick = () => {
    const nameAtCommunity = nameValue+"@"+communityValue;
    navigate(`/RegisterNameFinal/${nameAtCommunity}`);
};

const handleCommunitySelect = (selectedCommunity:string) => {
  setCommunityValue(selectedCommunity.toLowerCase());
};


useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if(isErrorCommunity||isErrorName){
      console.log("refetching")
      intervalId = setInterval(() => {
        refetchCommunity();
        refetchName();
      }, 1000);
    }
    return () => {
      if(intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isErrorCommunity, refetchCommunity,isErrorName,refetchName]);

  return (

    <>
    <div className="hcc1">
      <div className="hcc1-if">
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            className="rounded"
            type="text"
            id="inputName"
            aria-describedby="NameHelpBlock"
            placeholder="YOUR NAME"
            value={nameValue}
            onChange={handleNameInputChange}
            isInvalid={nameValidity === 'isInvalid'}
            isValid={nameValidity === 'isValid'}
          />
          <Form.Control.Feedback type="invalid">
            {nameFeedbackText}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            {nameFeedbackText}
          </Form.Control.Feedback>
        </InputGroup>
      </div>

      <div className="hcc1-if">
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            className="rounded"
            type="text"
            placeholder="COMMUNITY"
            aria-label="Community search"
            aria-describedby="basic-addon2"
            value={communityValue}
            onChange={handleCommunityInputChange}
            isInvalid={communityValidity === 'isInvalid'}
            isValid={communityValidity === 'isValid'}
          />
          <Form.Control.Feedback type="invalid">
            {communityFeedbackText}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            {communityFeedbackText}
          </Form.Control.Feedback>
        </InputGroup>
      </div>
    </div>

    <div className="hcc2">
      <div className="hc-loading">
        {isLoadingCommunity || isLoadingName || isErrorCommunity || isErrorName ? <Spinner animation="border" variant="secondary" />  : null}
      </div>
        <Form.Text id="TextForm" className='text-center'>Type your chosen name and a community name. Name: 3-15, Community: 3-10 characters.</Form.Text>
        <Button variant="dark" onClick={handleButtonClick} disabled={buttonStatus === 'disabled'}>
          PROCEED
        </Button>
    </div>
    <div className="rcbt">
      <div className="rcbt-c1">
        <p>{recentCommunities ? "Most recent communities:" : ""}</p>
      </div>
      <div className="rcbt-c2">
        {recentCommunities && (
          recentCommunities.map((community, index) => (
            <Button variant="outline-dark" key={index} onClick={() => handleCommunitySelect(community.toString())}>
              @{community.toString()}
            </Button>
          ))
        )}
      </div>
    </div>
  </>
);
}

export default NameSearch;
