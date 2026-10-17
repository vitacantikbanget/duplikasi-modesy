"use client";

import { useState, useRef } from "react";
import { Check, ChevronDown, FileSpreadsheet, X, HelpCircle } from "lucide-react";

export default function BulkProductUploadPage() {
  const [action, setAction] = useState("");
  const [listingType, setListingType] = useState("");
  const [currency, setCurrency] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".csv") || droppedFile.type.includes("csv")) {
        setFile(droppedFile);
        setUploadSuccess(false);
      } else {
        alert("Please select a valid CSV file (.csv)");
      }
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Short Description,Description,Category,Price,Currency,Quantity,SKU,Tags\n" +
      ",,,,,,,,\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "modesy_product_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadExample = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Short Description,Description,Category,Price,Currency,Quantity,SKU,Tags\n" +
      "\"Classic Denim Jacket\",\"Vintage washed casual denim jacket\",\"High quality denim with brass buttons and front pockets.\",\"Clothing\",49.99,\"USD\",25,\"CDJ-001\",\"jacket,denim,fashion\"\n" +
      "\"Minimalist Wristwatch\",\"Sleek unisex quartz watch\",\"Genuine leather strap with water resistant mineral glass.\",\"Accessories\",89.00,\"USD\",10,\"MW-102\",\"watch,minimal,gift\"\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "modesy_product_example.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a CSV file first");
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-2">
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Card: Form */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-[3px] p-6 sm:p-7 shadow-2xs">
          <h1 className="text-[16px] font-bold text-[#2c333e] mb-1 font-sans">
            Bulk Product Upload
          </h1>
          <p className="text-[12.5px] text-[#8c98a4] mb-6 font-sans">
            You can add your products with a CSV file from this section
          </p>

          <form onSubmit={handleSubmit}>
            {/* Select Action */}
            <div className="mb-5">
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Select Action
              </label>
              <div className="relative">
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
                >
                  <option value="">Select</option>
                  <option value="add_new">Add New Products</option>
                  <option value="update_existing">Update Existing Products</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Listing Type */}
            <div className="mb-5">
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Listing Type
              </label>
              <div className="relative">
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
                >
                  <option value="">Select</option>
                  <option value="sale">Add a Product for Sale</option>
                  <option value="ordinary">Add a Product or Service as an Ordinary Listing</option>
                  <option value="quote">Add a Product to Receive Quote (Price) Requests</option>
                  <option value="license">Add a Product to Sell License Keys</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Currency */}
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5">
                Currency
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-[3px] px-3.5 py-2 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
                >
                  <option value="">Select</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="IDR">IDR (Rp)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* CSV File Upload Area */}
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-[#2c333e] mb-2">
                CSV File
              </label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-[#d1d5db] rounded-[3px] py-10 px-4 text-center bg-[#fafbfc] hover:border-[#a0aec0] transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[180px]"
              >
                {/* Modesy Filled Cloud Icon with arrow */}
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 24 24"
                  fill="#9ca3af"
                  className="mb-2.5"
                >
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                </svg>

                <p className="text-[12.5px] text-[#8c98a4] mb-3 select-none">
                  Drag and drop file here or
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="border border-[#d1d5db] rounded-[3px] px-4 py-1.5 text-[12.5px] text-[#6c757d] hover:border-gray-400 bg-white shadow-2xs font-normal"
                >
                  Browse Files
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Selected File Details */}
              {file && (
                <div className="mt-3 flex items-center justify-between p-2.5 bg-[#f0f9f8] border border-[#00ab97]/30 rounded-[3px] text-[12.5px] text-[#008775]">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#00ab97]" />
                    <span className="font-medium text-[#2c333e]">{file.name}</span>
                    <span className="text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload Success Notice */}
              {uploadSuccess && (
                <div className="mt-3 flex items-center gap-2 p-3 bg-[#e8f7f5] border border-[#00ab97] rounded-[3px] text-[13px] text-[#008775]">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>CSV file has been validated and products uploaded successfully!</span>
                </div>
              )}
            </div>

            {/* Submit Button if File Selected */}
            {file && (
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-[#00ab97] hover:bg-[#009180] text-white px-5 py-2.5 rounded-[3px] text-[13px] font-medium transition-colors shadow-2xs"
                >
                  {isUploading ? "Uploading..." : "Upload Products"}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right Card: Help Documents */}
        <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-[3px] p-6 shadow-2xs">
          <h2 className="text-[15px] font-bold text-[#2c333e] mb-1 font-sans">
            Help Documents
          </h2>
          <p className="text-[12px] text-[#8c98a4] mb-5 font-sans">
            You can use these documents to generate your CSV file
          </p>

          <div className="flex flex-col gap-2.5">
            {/* Download CSV Template */}
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="w-full bg-[#00ab97] hover:bg-[#009180] text-white py-2.5 px-4 rounded-[3px] text-[13px] font-medium transition-colors text-center shadow-2xs cursor-pointer"
            >
              Download CSV Template
            </button>

            {/* Download CSV Example */}
            <button
              type="button"
              onClick={handleDownloadExample}
              className="w-full bg-[#0084ff] hover:bg-[#0074e0] text-white py-2.5 px-4 rounded-[3px] text-[13px] font-medium transition-colors text-center shadow-2xs cursor-pointer"
            >
              Download CSV Example
            </button>

            {/* Documentation */}
            <button
              type="button"
              onClick={() => setShowDocModal(true)}
              className="w-full bg-[#5a6268] hover:bg-[#4e555b] text-white py-2.5 px-4 rounded-[3px] text-[13px] font-medium transition-colors text-center shadow-2xs cursor-pointer"
            >
              Documentation
            </button>
          </div>
        </div>

      </div>

      {/* Documentation Modal */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-lg w-full p-6 shadow-xl relative animate-in fade-in">
            <button
              onClick={() => setShowDocModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-[#00ab97]" />
              <h3 className="text-[16px] font-bold text-[#2c333e]">CSV Upload Guide</h3>
            </div>
            <div className="text-[13px] text-[#495057] space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              <p>When preparing your CSV file, ensure the following column headers exist:</p>
              <ul className="list-disc pl-5 space-y-1 text-[12.5px] text-[#6c757d]">
                <li><strong>Title:</strong> The name of the product (Required)</li>
                <li><strong>Short Description:</strong> Brief summary of the item</li>
                <li><strong>Description:</strong> Full HTML or text description</li>
                <li><strong>Category:</strong> Exact category name (e.g., Clothing, Electronics)</li>
                <li><strong>Price:</strong> Numeric price value (e.g., 29.99)</li>
                <li><strong>Currency:</strong> ISO code matching selected currency (e.g., USD)</li>
                <li><strong>Quantity:</strong> Stock quantity count</li>
                <li><strong>SKU:</strong> Unique inventory identifier</li>
                <li><strong>Tags:</strong> Comma-separated keywords</li>
              </ul>
              <p className="text-[12px] text-[#8c98a4] mt-2">
                Tip: You can download the CSV Template and Example above to see the exact structure.
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowDocModal(false)}
                className="bg-[#00ab97] text-white px-4 py-2 rounded-[3px] text-xs font-medium hover:bg-[#009180]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
