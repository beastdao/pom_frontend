import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FunctionComponent<PageContentProps> = ({children}) => {

const [showAlert, setShowAlert] = useState<boolean>(true);

return(

  <div className="page-content">

    <div className="page-content-child">{children}</div>
    <>
      {[
        'danger',
      ].map((variant) => (
        <Alert className="bottom m-2" key={variant} variant={variant} onClose={() => setShowAlert(false)} dismissible>
          <b>Attention!</b> We are now at the early Alpha test stage, protocol may be updated any time leading to old data unavailability. <a href="https://forms.gle/qAsZ74NM5GZjpRc88" target="_blank"><b>Join our waitlist</b></a>
        </Alert>
      ))}
    </>
  </div>

);
}
export default PageContent;
