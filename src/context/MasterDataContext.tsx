import React, { createContext, useContext } from "react";

type StatusItem = {
  label: string;
  value: string;
};

interface MasterData {
  status: StatusItem[];
}

const MasterDataContext = createContext<MasterData | null>(null);

export const MasterDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const status: StatusItem[] = [
    { label: "Fresh", value: "Fresh" },

    { label: "Inspection Scheduled", value: "Inspection Scheduled" },
    { label: "Inspections Done", value: "Inspections Done" },
    { label: "Inspection Call back", value: "Inspection Call back" },
    { label: "Inspection Follow Up", value: "Inspection Follow Up" },
    { label: "Inspection Future hold", value: "Inspection Future hold" },
    { label: "Inspection Not Required now", value: "Inspection Not Required now" },
    { label: "Inspection Rejected", value: "Inspection Rejected" },

    { label: "Report Waiting for raw report", value: "Report Waiting for raw report" },
    { label: "Report under Creation", value: "Report under Creation" },
    { label: "Report shared to CX", value: "Report shared to CX" },

    { label: "Sale Call back", value: "Sale Call back" },
    { label: "Sale Follow Up", value: "Sale Follow Up" },
    { label: "Sale Future hold", value: "Sale Future hold" },
    { label: "Sale Not Required now", value: "Sale Not Required now" },
    { label: "Sale Rejected", value: "Sale Rejected" },
    { label: "Sales Converted", value: "Sales Converted" },

    { label: "Full Payment done", value: "Full Payment done" },
    { label: "1st installment paid", value: "1st installment paid" },
    { label: "2nd installment paid", value: "2nd installment paid" },
    { label: "3rd installment paid", value: "3rd installment paid" },
    { label: "Final Installment paid", value: "Final Installment paid" },
  ];

  return (
    <MasterDataContext.Provider value={{ status }}>
      {children}
    </MasterDataContext.Provider>
  );
};

export const useMasterData = () => {
  const context = useContext(MasterDataContext);
  if (!context) {
    throw new Error("useMasterData must be used inside MasterDataProvider");
  }
  return context;
};
