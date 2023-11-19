import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RenderSVG } from '../wagmiHooks/RenderSVG';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import Alert from 'react-bootstrap/Alert';
import {calculateTokenId} from '../utils/calculateTokenId';
import TxStatusModalWithTokenId from '../txStatusModalComponents/TxStatusModalWithTokenId';


function checkName(textData:boolean){
  let feedback;
  let validity;
  let buttonStatus;
  if(textData === false){
     feedback =  'Name is not available for registration in this community';
     validity = 'isInvalid';
     buttonStatus = 'disabled';
  }else{
     feedback = 'Name is available for registration in this community';
     validity ='isValid';
     buttonStatus = '';
  }
  return [feedback,validity,buttonStatus];
}

function prettyPrice(priceData:number) {
  const prettyPrice = new BigNumber(priceData).dividedBy(new BigNumber(10).pow(18)).toString();
  return prettyPrice;
}

function getCurrentMonthAndYear() {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return `${currentMonth} ${currentYear}`;
}

function checkIfAdmin(isAdminData:string|undefined,userAddress:string|undefined){
  return isAdminData === userAddress ? "Admin" : "Basic Member";
}


function NameRegister({ nameAtCommunity }: { nameAtCommunity: string }) {

  const navigate = useNavigate();
  const [feedBackText, setFeedBackText] = useState<string>('');
  const [inputValidity, setInputValidity] = useState<string|null>(null);
  const [buttonStatus, setButtonStatus] = useState<string>('disabled');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [priceTier, setPriceTier] = useState<bigint>(BigInt(0));
  const [adminAddress, setAdminAddress] = useState<string>('');
  const [imgData, setImgData] = useState<string>();
  const { address } = useAccount();
  const [errorCount, setErrorCount] = useState<number>(0);


  let [nameValue,communityValue] = nameAtCommunity.split("@");

  const tokenId :string | undefined = calculateTokenId(nameValue,communityValue);

  const formattedDate = getCurrentMonthAndYear();

  const {
    data,
    refetch,
    isError,
    isLoading,
  } = NamesRegistryReadHook({functionName:'availableName',functionArgs:[nameValue,communityValue]});



  const {
    data: dataPrice,
    refetch: refetchPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
  } = NamesRegistryReadHook({functionName:'getPriceTier',functionArgs:[nameValue]});

  const {
    data: dataIsAdmin,
    refetch: refetchIsAdmin,
    isError: isErrorIsAdmin,
    isLoading: isLoadingIsAdmin,
  } = NamesRegistryReadHook({functionName:'getCommunityAdmin',functionArgs:[communityValue]});

  const memberRole = checkIfAdmin(adminAddress,address?.toString());

  const {
    data: dataSVG,
    refetch: refetchSVG,
    isError: isErrorSVG,
    isLoading: isLoadingSVG,
  } = RenderSVG(nameAtCommunity,formattedDate,memberRole);

  const {
    write: writeRegName,
    receipt: receiptRegName,
    isPending: isPendingRegName,
    isSuccess: isSuccessRegName,
    isWriteError: isErrorRegNameWrite,
    isTxError: isErrorRegNameTx,
    writeError: errorRegNameWrite,
    txError: errorRegNameTx,
    isLoading: isLoadingRegName,
    txRefetch: txRefetchRegName,
  } = NamesRegistryWriteHook({functionName:'registerName',functionArgs:[nameValue, communityValue],txValue:BigInt(priceTier)});


useEffect(() => {
  if (dataPrice !== undefined && BigInt(dataPrice.toString())!==priceTier) {
    setPriceTier(BigInt(dataPrice.toString()));
  }
}, [dataPrice]);

useEffect(() => {
if (dataIsAdmin !== undefined && dataIsAdmin.toString()!==adminAddress) {
  setAdminAddress(dataIsAdmin.toString());
}
}, [dataIsAdmin]);

useEffect(() => {
if (dataSVG !== undefined && dataSVG!==null && dataSVG.toString()!==imgData) {
  setImgData(dataSVG.toString());
}
}, [dataSVG]);


//check if name is already taken
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 15000); // 15000 milliseconds = 15 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let [status, validity] = checkName(Boolean(data));
    setFeedBackText(status);
    setInputValidity(validity);
  }, [data]);

  useEffect(() => {
    if (feedBackText === 'Name is available for registration in this community' && isCheckboxValid() && !isLoadingIsAdmin && !isLoadingPrice && address!==undefined)  {
      setButtonStatus('');
    } else {
      setButtonStatus('disabled');
    }
  }, [feedBackText, isChecked, address]);

//refetching
  useEffect(() => {
    if (isErrorRegNameTx && errorCount<=5) {
      const timer = setTimeout(() => {
        txRefetchRegName();
        setErrorCount(errorCount+1);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (isPendingRegName || isSuccessRegName) {
      setErrorCount(0);
    }
  }, [isErrorRegNameTx, isPendingRegName, isSuccessRegName]);



  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const isCheckboxValid = () => {
    return isChecked;
  };


  const handleRegisterClick =  () => {
      writeRegName?.();
      setIsButtonClicked(true);
      setShowModal(true);
  };


  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setIsButtonClicked(false);
    navigate('/');
  };



  return (
    <div className="hcc2">
      <Form>
        <Form.Group className="mb-3" controlId="formNameAtCommunity">
          <Form.Control
            type="text"
            value={nameAtCommunity}
            disabled
            isInvalid={inputValidity === 'isInvalid'}
            isValid={inputValidity === 'isValid'}
          />
          <Form.Control.Feedback type="invalid">
            {feedBackText}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            {feedBackText}
          </Form.Control.Feedback>
        </Form.Group>
        <>
        {[ 'light',
          ].map((variant) => (
            <Alert key={variant} variant={variant}>
              <div>
                <p> <b>Name price:</b> {isLoadingPrice || isErrorPrice ? "loading..." : prettyPrice(Number(priceTier)) + " ETH"} </p>
                <p> <b>Ownership period:</b> lifelong </p>
                <p> <b>Community Admin:</b> {isLoadingIsAdmin || isErrorIsAdmin ? "loading..." : adminAddress} </p>
                <p> 80% ({isLoadingPrice || isErrorPrice ? 'loading...' : (Number(prettyPrice(Number(priceTier)))*0.8).toFixed(3)} ETH) goes to the community treasury </p>
              </div>
            </Alert>
          ))}

        </>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I accept Terms and Conditions"
            isInvalid={!isCheckboxValid()}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Card style={{ width: '20rem' }} bg="light">
        {isLoadingSVG || isErrorSVG || !dataSVG ? 'loading...' :
         <object data={imgData} type="image/svg+xml"> Card image </object>}
          <Card.Body>

            <Button
              variant="dark"
              type="button"
              disabled={buttonStatus === 'disabled'}
              onClick={handleRegisterClick} // Call the function when the "Register" button is clicked
            >
              Register
            </Button>
          </Card.Body>
        </Card>

        {isButtonClicked && (

          <TxStatusModalWithTokenId
          show = {showModal}
          onClose ={closeModal}
          isPending = {isPendingRegName}
          isTxError = {isErrorRegNameTx}
          errorCount = {errorCount}
          txError= {errorRegNameTx ? errorRegNameTx : undefined}
          isWriteError ={isErrorRegNameWrite}
          writeError = {errorRegNameWrite ? errorRegNameWrite : undefined}
          isLoading = {isLoadingRegName}
          isSuccess = {isSuccessRegName}
          receipt = {receiptRegName ? receiptRegName : undefined}
          tokenId = {tokenId ? tokenId : undefined}
          />

      )}
      </Form>
    </div>
  );
}

export default NameRegister;
