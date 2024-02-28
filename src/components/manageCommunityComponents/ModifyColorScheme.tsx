import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import TxStatusModalReceipt from '../txStatusModalComponents/TxStatusModalReceipt';
import { RenderSVG, ColorScheme, defaultColorScheme } from '../wagmiHooks/RenderSVG';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';

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


function ModifyColorScheme({ searchValue, buttonsStatus }: { searchValue: string, buttonsStatus: string }) {
  const [imgData, setImgData] = useState<string>();
  const [CS, setCS] = useState<ColorScheme>(defaultColorScheme);
  const [showModal, setShowModal] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const navigate = useNavigate();
  const colorSchemeArray = Object.values(CS);

  const {
    write: writeModifyCS,
    receipt: receiptModifyCS,
    isPending: isPendingModifyCS,
    isSuccess: isSuccessModifyCS,
    isWriteError: isWriteErrorModifyCS,
    isTxError: isTxErrorModifyCS,
    writeError: writeErrorModifyCS,
    txError: txErrorModifyCS,
    isLoading: isLoadingModifyCS,
    txRefetch: txRefetchModifyCS,
  } = NamesRegistryWriteHook({ functionName: 'modifyColorSchemeForCommunity', functionArgs: [searchValue, [...colorSchemeArray]], txValue: BigInt("0") });


  const {
    data: fetchedDataCS,
  } = NamesRegistryReadHook({ functionName: 'getCommunityColorScheme', functionArgs: [searchValue] });


  useEffect(() => {
    if (fetchedDataCS) {
      setCS(fetchedDataCS as unknown as ColorScheme);
    } else {
      console.error('Invalid color scheme data:', fetchedDataCS);
    }
  }, [fetchedDataCS]);


  //refetching
  useEffect(() => {
    if (isTxErrorModifyCS && errorCount <= 5) {
      const timer = setTimeout(() => {
        txRefetchModifyCS();
        setErrorCount(errorCount + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (isPendingModifyCS || isSuccessModifyCS) {
      setErrorCount(0);
    }
  }, [isTxErrorModifyCS, isPendingModifyCS, isSuccessModifyCS]);


  const formattedDate = getCurrentMonthAndYear();
  const {
    data: dataSVG,
    refetch: refetchSVG,
    isError: isErrorSVG,
    isLoading: isLoadingSVG,
  } = RenderSVG("name", formattedDate, "Admin", searchValue, CS);

  useEffect(() => {
    if (dataSVG !== undefined && dataSVG !== null && dataSVG.toString() !== imgData) {
      setImgData(dataSVG.toString());
    }
  }, [dataSVG, imgData]);

  console.log(CS);

  const handleColorChange = (property: keyof ColorScheme) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCS({
        ...CS,
        [property]: event.target.value,
      });
    };

  const isCSValid = () => {
    return (CS !== defaultColorScheme);
  };

  const buttonStatus = () => {
    if (isCSValid() && buttonsStatus === 'enabled') {
      return 'enabled';
    } else {
      return 'disabled';
    }
  }

  const handleModifyCSClick = () => {
    if (isCSValid()) {
      writeModifyCS?.();
      setIsButtonClicked(true);
      setShowModal(true);
    }
  };


  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setIsButtonClicked(false);
    navigate('');
  };


  return (
    <div className='mccf'>
      <div className="mccfl">
        <Card style={{ objectFit: 'none', maxWidth: '20rem' }} bg="light">
          {isLoadingSVG || isErrorSVG || !dataSVG ? 'loading...' :
            <object data={imgData} type="image/svg+xml"> Card image </object>}
          <Card.Body>
            <Button
              variant="warning"
              type="button"
              disabled={buttonStatus() === 'disabled'}
              onClick={handleModifyCSClick} // Call the function when the "Register" button is clicked
            >
              Change CS
            </Button>
          </Card.Body>
        </Card>

        {isButtonClicked && (

          <TxStatusModalReceipt
            show={showModal}
            onClose={closeModal}
            isPending={isPendingModifyCS}
            isTxError={isTxErrorModifyCS}
            errorCount={errorCount}
            txError={txErrorModifyCS ? txErrorModifyCS : undefined}
            isWriteError={isWriteErrorModifyCS}
            writeError={writeErrorModifyCS ? writeErrorModifyCS : undefined}
            isLoading={isLoadingModifyCS}
            isSuccess={isSuccessModifyCS}
            receipt={receiptModifyCS ? receiptModifyCS : undefined}
          />
        )}
      </div>
      <div className="mccfr">
        {Object.keys(CS).map((key) => (
          <div key={key}>
            <Form.Label htmlFor={`${key}ColorInput`}>{key}</Form.Label>
            <Form.Control
              type="color"
              size="sm"
              id={`${key}ColorInput`}
              defaultValue={CS[key as keyof ColorScheme]}
              title={`Choose your ${key} color`}
              onChange={handleColorChange(key as keyof ColorScheme)}
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default ModifyColorScheme;
