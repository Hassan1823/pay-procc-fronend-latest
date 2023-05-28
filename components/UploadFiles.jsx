import React from "react";
import CompanyPresentation from "./CompanyPresentation";
import MerchantForm from "./MerchantForm";
import ComplianceReport from "./ComplianceReport";
import ProofCompliance from "./ProofCompliance";
import FileUpload from "./FileUpload";

const UploadFiles = (props) => {
  const { onHandleDataChange, formData } = props;

  const handleFileChange = (event, type) => {
    console.log(event, type)
    if (event.target?.files && event.target?.files.length > 0) {
      if (event.target.files[0].size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      onHandleDataChange(type, event.target.files[0])
    } else {
      onHandleDataChange(type, null)
    }
  };

  return (
    <div className="md:px-0 px-4">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">
          Upload Files
        </h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please upload the following file in the required sections
        </p>
        <div className="border-b border-slate-900 w-[80%] h-1"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
            Upload your Company Presentation
          </h1>
        </div>
        <FileUpload
            name="Company Presentation"
            selected={formData?.company_presentation}
            handleFileChange={(e) => handleFileChange(e, 'company_presentation')}
            docType={".ppt,.pptx,.pdf,"}
            />
       
      </div>


      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
          Upload your Merchant Application Form
          </h1>
        </div>
        <FileUpload
            name="Company Presentation"
            selected={formData?.merchent_application_form}
            handleFileChange={(e) => handleFileChange(e, 'merchent_application_form')}
            docType={".ppt,.pptx,.pdf,"}
            />
       
      </div>

      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
          Upload your PCI DSS Compliance Report (AOC / ROC)
          </h1>
        </div>
        <FileUpload
            name="Company Presentation"
            selected={formData?.pci_dss_compliance_report}
            handleFileChange={(e) => handleFileChange(e, 'pci_dss_compliance_report')}
            docType={".ppt,.pptx,.pdf,"}
            />
       
      </div>

      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
          Upload your PCI DSS Compliance Report (AOC / ROC)
          </h1>
        </div>
        <FileUpload
            name="Company Presentation"
            selected={formData?.proof_compliance}
            handleFileChange={(e) => handleFileChange(e, 'proof_compliance')}
            docType={".ppt,.pptx,.pdf,"}
            />
       
      </div>
    </div>
  );
};

export default UploadFiles;
