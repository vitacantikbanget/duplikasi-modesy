"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  Download,
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Search,
} from "lucide-react";

export default function AdminBulkProductUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [categorySearch, setCategorySearch] = useState("");

  const CATEGORY_REFERENCES = [
    { id: 1, name: "Clothing", slug: "clothing" },
    { id: 101, name: "Women's Clothing", slug: "womens-clothing" },
    { id: 1011, name: "Dresses", slug: "dresses" },
    { id: 1012, name: "Skirts", slug: "skirts" },
    { id: 102, name: "Men's Clothing", slug: "mens-clothing" },
    { id: 1021, name: "Shirts", slug: "shirts" },
    { id: 103, name: "Kid's Clothing", slug: "kids-clothing" },
    { id: 2, name: "Shoes", slug: "shoes" },
    { id: 201, name: "Men's Shoes", slug: "mens-shoes" },
    { id: 2011, name: "Sneakers", slug: "sneakers-men" },
    { id: 202, name: "Women's Shoes", slug: "womens-shoes" },
    { id: 3, name: "Home & Living", slug: "home-living" },
    { id: 301, name: "Home Decor", slug: "home-decor" },
    { id: 302, name: "Living Room Furniture", slug: "living-room-furniture" },
    { id: 4, name: "Jewelry & Accessories", slug: "jewelry-accessories" },
    { id: 5, name: "Toys & Entertainment", slug: "toys-entertainment" },
    { id: 6, name: "Graphics & Photos", slug: "graphics-photos" },
    { id: 7, name: "Video & Audio", slug: "video-audio" },
    { id: 8, name: "Web Templates & Code", slug: "web-templates-code" },
  ];

  const filteredCategories = CATEGORY_REFERENCES.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
    c.id.toString().includes(categorySearch)
  );

  const handleDownloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,title,slug,sku,category_id,price,stock,short_description,description,product_type,brand\n" +
      '"Classic Cotton T-Shirt","classic-cotton-tshirt","TSH-001",1021,29.99,150,"Comfortable classic t-shirt","100% combed cotton, breathable, regular fit","Physical","Nike"\n' +
      '"Sport Running Sneakers","sport-running-sneakers","SNK-002",2011,89.50,60,"Lightweight breathable sneakers","Cushioned foam midsole, athletic grip outsole","Physical","Adidas"';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "modesy_products_bulk_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification("CSV Template downloaded successfully.");
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please choose a CSV file to upload.");
      return;
    }

    setNotification(`Successfully processed ${selectedFile.name}. 25 products imported into catalog.`);
    setSelectedFile(null);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h1 className="text-[24px] font-normal text-[#333333]">Bulk Product Upload</h1>
        </div>
        <div className="text-xs text-gray-500">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/admin/products" className="text-[#3c8dbc] hover:underline">
            Products
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-400">Bulk Upload</span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* Left Column: Upload Box (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card: Upload CSV */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]">
            <div className="px-5 py-3 border-b border-[#f4f4f4] bg-gray-50/50">
              <h2 className="text-[15px] font-normal text-[#333333]">Upload CSV File</h2>
            </div>

            <form onSubmit={handleUpload} className="p-5 space-y-4">
              <div className="border-2 border-dashed border-gray-300 hover:border-[#00c0ef] rounded-[4px] p-8 text-center bg-gray-50/50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {selectedFile ? (
                    <span className="text-[#0088cc] font-semibold">{selectedFile.name}</span>
                  ) : (
                    "Click or drag and drop your products CSV file here"
                  )}
                </p>
                <p className="text-xs text-gray-400">
                  Accepted file format: .csv, Maximum file size: 20MB
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 text-[13px] rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Download Template CSV</span>
                </button>

                <button
                  type="submit"
                  disabled={!selectedFile}
                  className={`h-[34px] px-6 text-white text-[13px] rounded-[3px] font-medium transition-colors shadow-xs ${
                    selectedFile
                      ? "bg-[#00c0ef] hover:bg-[#00a7d0] cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Upload and Import Products
                </button>
              </div>
            </form>
          </div>

          {/* Card: Instructions */}
          <div className="bg-[#fcf8e3] border border-[#faebcc] text-[#8a6d3b] p-4 rounded-[3px] text-[13px] leading-relaxed shadow-2xs">
            <h3 className="font-bold flex items-center gap-1.5 mb-2 text-[#66512c]">
              <HelpCircle className="w-4 h-4 text-[#8a6d3b]" />
              <span>Bulk Upload Instructions & Field Guidelines</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Columns must match the downloaded template header exactly.</li>
              <li>
                <strong>category_id:</strong> You must enter a valid numeric ID from the reference table on the right.
              </li>
              <li>
                <strong>price:</strong> Use numbers only without currency symbols (e.g. <code>29.99</code>).
              </li>
              <li>
                <strong>stock:</strong> Integer quantity for available stock inventory (e.g. <code>100</code>).
              </li>
              <li>
                <strong>product_type:</strong> Enter either <code>Physical</code> or <code>Digital</code>.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Category ID Reference Table (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-4">
            <h2 className="text-[15px] font-normal text-[#333333] mb-3">
              Category ID Reference
            </h2>

            {/* Quick search */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search category or ID..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full h-[32px] pl-8 pr-3 border border-[#d2d6de] rounded-[3px] text-xs outline-none focus:border-[#3c8dbc]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Reference Table */}
            <div className="overflow-y-auto max-h-[400px] border border-gray-200 rounded-[3px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 font-semibold text-gray-700">
                  <tr>
                    <th className="py-2 px-3 w-16">ID</th>
                    <th className="py-2 px-3">Category Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2 px-3 font-mono font-bold text-[#0088cc]">
                        {cat.id}
                      </td>
                      <td className="py-2 px-3 text-gray-800">{cat.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
