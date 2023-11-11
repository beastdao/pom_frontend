import React from 'react';
import '../../App.css';

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FunctionComponent<PageContentProps> = ({children}) => (
  <div className="page-content">

    <div className="page-content-child">{children}</div>
  </div>
);

export default PageContent;
