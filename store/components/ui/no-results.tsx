import React from "react";

interface NoResultsProps {
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({
  message = "No results found.",
}) => {
  return (
    <div className="flex text-center items-center justify-center h-full w-full text-neutral-500 py-10">
      {message}
    </div>
  );
};

export default NoResults;
