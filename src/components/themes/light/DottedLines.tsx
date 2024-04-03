import React from 'react';

const DottedLines = () => {
  return (
    <div className="flex flex-col absolute inset-0">
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
      <div className="text-gray-300 text-xl">
        <span className="whitespace-nowrap">
          {Array.from({ length: 100 }, () => '-').join(' ')}
        </span>
      </div>
    </div>
  );
};

export default DottedLines;