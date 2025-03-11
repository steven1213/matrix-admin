import React from 'react';
import './Breadcrumb.scss';

interface BreadcrumbProps {
  path: string[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  return (
    <div className="breadcrumb">
      <i className="icon-home"></i>
      
      {path.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="separator">
              <i className="icon-chevron-right"></i>
            </span>
          )}
          <span className={`breadcrumb-item ${index === path.length - 1 ? 'active' : ''}`}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};