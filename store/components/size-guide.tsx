"use client";
import React, { useState } from "react";

interface SizeInfo {
  bodyPart: string;
  S: string;
  M: string;
  L: string;
  XL: string;
}

interface SizeGuidePopupProps {
  title: string;
  mensSizeInfo?: SizeInfo[];
  womensSizeInfo?: SizeInfo[];
}

const SizeGuidePopup: React.FC<SizeGuidePopupProps> = ({
  title = "Size Chart",
  mensSizeInfo = [],
  womensSizeInfo = [],
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("mens");

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
        activeTab === id
          ? "bg-white text-gray-900 border-b-2 border-[#EE6470]"
          : "text-gray-500 hover:text-gray-700 bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  const SizeTable = ({ data }: { data: SizeInfo[] }) => (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr>
          <th className="p-2 border text-left bg-gray-50">Body Part</th>
          <th className="p-2 border text-center bg-gray-50">S</th>
          <th className="p-2 border text-center bg-gray-50">M</th>
          <th className="p-2 border text-center bg-gray-50">L</th>
          <th className="p-2 border text-center bg-gray-50">XL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((size, index) => (
          <tr key={index}>
            <td className="p-2 border font-medium">{size.bodyPart}</td>
            <td className="p-2 border text-center">{size.S}</td>
            <td className="p-2 border text-center">{size.M}</td>
            <td className="p-2 border text-center">{size.L}</td>
            <td className="p-2 border text-center">{size.XL}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="ml-4 flex gap-1 text-neutral-950 underline text-xs font-bold align-top cursor-pointer"
      >
        Size Guide
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g clipPath="url(#clip0_429_11160)">
              <circle
                cx="12"
                cy="11.9999"
                r="9"
                stroke="#0a0a0a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
              <rect
                x="12"
                y="8"
                width="0.01"
                height="0.01"
                stroke="#0a0a0a"
                strokeWidth="3.75"
                strokeLinejoin="round"
              ></rect>
              <path
                d="M12 12V16"
                stroke="#0a0a0a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_429_11160">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </g>
        </svg>
      </span>
      {open && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {title}
                    </h3>
                    <div className="flex gap-2 border-b">
                      <TabButton id="mens" label="Men's Sizes" />
                      <TabButton id="womens" label="Women's Sizes" />
                    </div>
                    <div className="mt-4">
                      {activeTab === "mens" ? (
                        mensSizeInfo.length > 0 ? (
                          <>
                            <p className="text-sm text-gray-500 mb-2">All measurements are in inches</p>
                            <SizeTable data={mensSizeInfo} />
                          </>
                        ) : (
                          <p className="text-gray-500">
                            No men's size information available.
                          </p>
                        )
                      ) : womensSizeInfo.length > 0 ? (
                        <>
                          <p className="text-sm text-gray-500 mb-2">All measurements are in inches</p>
                          <SizeTable data={womensSizeInfo} />
                        </>
                      ) : (
                        <p className="text-gray-500">
                          No women's size information available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#EE6470] text-base font-medium text-white hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SizeGuidePopup;