import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

interface PageContentProps {
    children: React.ReactNode;
}

const PageContent: React.FunctionComponent<PageContentProps> = ({ children }) => {
    const [showAlert, setShowAlert] = useState<boolean>(true);

    return (
        <div className="page-content">
            <div className="page-content-child">{children}</div>
            <>
                {['danger'].map((variant) => (
                    <Alert
                        className="bottom m-2"
                        key={variant}
                        variant={variant}
                        onClose={() => setShowAlert(false)}
                        dismissible
                    >
                        <b>PoM is in Beta</b> We are now in the active development stage, various
                        errors and bugs may occur!{' '}
                        <a href="https://discord.gg/McqF7vyCWx" target="_blank" rel="noreferrer">
                            <b>Join our Discord</b>
                        </a>
                    </Alert>
                ))}
            </>
        </div>
    );
};
export default PageContent;
