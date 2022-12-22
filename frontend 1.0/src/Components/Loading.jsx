import React from 'react';

const Loading = () => {
  return (
    <div className="all-center w-100 h-100">
      <div className="spinner-border" role="status" />
      <div className="spinner-border spinner-border-2" role="status" />
      <div className="spinner-border spinner-border-3" role="status" />
      <div className="spinner-border spinner-border-4" role="status" />
    </div>
  );
};

export default Loading;
