import React, { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading...');
      const res = await fetch(`${backendUrl}/upload-user`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(`Success: ${data.message} (Inserted: ${data.inserted}, Updated: ${data.updated})`);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus('Upload failed.');
    }
  };

  // Upload from Google Sheets public URL
  const handleSheetUrlUpload = async () => {
    if (!sheetUrl.trim()) {
      setStatus('Please enter a Google Sheets URL.');
      return;
    }
    setLoading(true);
    setStatus('Fetching Google Sheet...');
    try {
      // Extract the sheet ID from the URL
      const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      const sheetId = match ? match[1] : null;
      if (!sheetId) {
        setStatus('Invalid Google Sheets URL.');
        setLoading(false);
        return;
      }
      // Use Google Sheets API to get data as CSV (public sheets only)
      const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      const res = await fetch(exportUrl);
      if (!res.ok) {
        setStatus('Failed to fetch Google Sheet. Make sure it is public.');
        setLoading(false);
        return;
      }
      const csv = await res.text();
      // Send CSV to backend for processing
      const formData = new FormData();
      const blob = new Blob([csv], { type: 'text/csv' });
      formData.append('file', blob, 'sheet.csv');
      const uploadRes = await fetch(`${backendUrl}/upload-user`, {
        method: 'POST',
        body: formData,
      });
      const data = await uploadRes.json();
      if (uploadRes.ok) {
        setStatus(`Success: ${data.message} (Inserted: ${data.inserted}, Updated: ${data.updated})`);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus('Upload from Google Sheets failed.');
    }
    setLoading(false);
  };

  // Placeholder for Google Drive Picker integration
  const handleDrivePicker = () => {
    alert("Google Drive Picker integration requires additional setup. See Google Picker API documentation.");
    // You would need to load the Google Picker API, authenticate, and handle file selection.
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-2 py-8 bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 md:p-10 border border-orange-100">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 mb-6 text-center drop-shadow animate-fade-in-up">
          Upload Excel File
        </h2>
        <div className="mb-4 text-sm text-blue-700 bg-blue-100 border border-blue-300 rounded p-3">
          <p>
            <strong>Notice:</strong> The Excel file must have columns: <span className="font-semibold">Name</span>, <span className="font-semibold">Address</span>, <span className="font-semibold">Due</span>.
          </p>
          <a
            href="/template.xlsx"
            download
            className="inline-block mt-2 text-blue-600 underline hover:text-blue-800"
          >
            Download template file
          </a>
        </div>
        {/* Local file upload */}
        <label className="block mb-4">
          <span className="block text-gray-700 mb-2 font-medium">Select Excel File</span>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm transition"
            onChange={handleFileChange}
          />
        </label>
        <button
          type="button"
          onClick={handleUpload}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
        >
          Upload Local File
        </button>
        {/* Google Sheets URL upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Or paste Google Sheets public link</label>
          <input
            type="text"
            placeholder="https://docs.google.com/spreadsheets/..."
            value={sheetUrl}
            onChange={e => setSheetUrl(e.target.value)}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm transition mb-2"
          />
          <button
            type="button"
            onClick={handleSheetUrlUpload}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {loading ? "Uploading..." : "Upload from Google Sheets"}
          </button>
        </div>
        {/* Google Drive Picker */}
        <div className="mb-2">
          <button
            type="button"
            onClick={handleDrivePicker}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Select from Google Drive
          </button>
        </div>
        {status && (
          <div className={`mt-4 text-center text-sm font-medium ${status.startsWith('Success') ? 'text-green-700' : 'text-red-700'}`}>
            {status}
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
};

export default UploadData;
