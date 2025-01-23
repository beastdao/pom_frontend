import React from 'react';
import Alert from 'react-bootstrap/Alert';

interface PageContentProps {
    children: React.ReactNode;
}

const PageContent: React.FunctionComponent<PageContentProps> = ({ children }) => {
    return (
        <div className="page-content">
            <div className="page-content-child">{children}</div>

            <Alert className="bottom m-2" variant="danger" dismissible>
                <b>0xNAME is in Beta</b> We are now in the active development stage, various errors and
                bugs may occur!{' '}
                <a href="https://discord.gg/McqF7vyCWx" target="_blank" rel="noreferrer">
                    <b>Join our Discord</b>
                </a>
            </Alert>
        </div>
    );
};
export default PageContent;
