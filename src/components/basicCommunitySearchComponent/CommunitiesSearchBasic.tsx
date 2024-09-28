import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { getValidationConditions } from '../utils/inputValidationConditions';
import { useNavigate } from 'react-router-dom';


function checkCommunity(textData: string, comparisonString: string | undefined, validFeedback: string, invalidFeedback: string) {
  let feedback;
  let validity;
  let buttonStatus;

  if (comparisonString === undefined){
    feedback = "Connect Wallet!";
    validity = 'isInvalid';
    buttonStatus = 'disabled';
  }else if (textData === comparisonString) {
    feedback = validFeedback;
    validity = 'isValid';
    buttonStatus = '';
  } else {
    feedback = invalidFeedback;
    validity = 'isInvalid';
    buttonStatus = 'disabled';
  }
  return [feedback, validity, buttonStatus];
}

interface CommunitiesSearchBasicProps {
  comparisonData: string |undefined,
  feedBackTextValid: string,
  feedbackTextInvalid :string,
  routePath: string;
}

const CommunitiesSearchBasic: React.FC<CommunitiesSearchBasicProps> = ({
  comparisonData,
  feedBackTextValid,
  feedbackTextInvalid,
  routePath,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [feedBackText, setFeedBackText] = useState<string>('');
  const [inputValidity, setInputValidity] = useState<string | null>(null);
  const [buttonStatus, setButtonStatus] = useState<string>('disabled');
  const navigate = useNavigate();

  const {
    data: dataCommunitySearch,
    refetch: refetchCommunitySearch,
    isError: isErrorCommunitySearch,
    isLoading: isLoadingCommunitySearch,
  } = NamesRegistryReadHook({functionName:'getCommunityAdmin',functionArgs:[searchValue]});


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue.toLowerCase());
  };

  const handleButtonClick = () => {
    navigate(`/${routePath}/${searchValue}`);
  };


  useEffect(() => {
    setFeedBackText('');
    setInputValidity(null);

    const communityValidationConditions = getValidationConditions(searchValue, 3, 10);
    let matchingCondition = null;

    if (communityValidationConditions !== null) {
      matchingCondition = communityValidationConditions.find((condition) => condition.condition);
    }

    if (matchingCondition) {
      setFeedBackText(matchingCondition.feedbackText);
      setInputValidity(matchingCondition.inputValidity);
      setButtonStatus(matchingCondition.buttonStatus);
    } else {
      if (dataCommunitySearch !== undefined) {
        let [status, validity, buttonStatus] = checkCommunity(dataCommunitySearch.toString(),comparisonData,feedBackTextValid,feedbackTextInvalid);
        setFeedBackText(status);
        setInputValidity(validity);
        setButtonStatus(buttonStatus);
      }
    }
  }, [searchValue, isLoadingCommunitySearch, dataCommunitySearch, comparisonData]);

  useEffect(() => {
    let intervalId: Timer | undefined;

    if (isErrorCommunitySearch) {
      intervalId = setInterval(() => {
        refetchCommunitySearch();
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isErrorCommunitySearch, refetchCommunitySearch]);

  return (
    <div className="cccc2">
      <div className="cccc1-if">
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <FormControl
            type="text"
            placeholder="COMMUNITY"
            aria-label="Community search"
            aria-describedby="basic-addon2"
            value={searchValue}
            onChange={handleInputChange}
            isInvalid={inputValidity === 'isInvalid'}
            isValid={inputValidity === 'isValid'}
          />
          <Form.Control.Feedback type="invalid">
            {feedBackText}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            {feedBackText}
          </Form.Control.Feedback>
        </InputGroup>
      </div>
      <div className="hc-loading">
        {isLoadingCommunitySearch || isErrorCommunitySearch ? <Spinner animation="border" variant="secondary" /> : null}
      </div>
      <Form.Text id="TextForm" className='text-center'>Type a community name to register. Length should be 3-10 characters.</Form.Text>
      <Button variant="dark" onClick={handleButtonClick} disabled={buttonStatus === 'disabled'}>
        PROCEED
      </Button>
    </div>
  );
};

export default CommunitiesSearchBasic;
