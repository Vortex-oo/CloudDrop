import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const App = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    }
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handelUpload = async () => {
    if (!file) {
      alert('Please upload a file!');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileUrl(response.data.url);
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-br from-slate-900 to-slate-800 w-full'  >
      <div className="  w-full h-screen flex justify-center items-center p-4">
        <div className='bg-white/[0.98] w-full max-w-md min-h-[500px] rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between backdrop-blur-xl'>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">CloudDrop</h1>
            <p className="text-slate-600">Upload and share your files securely</p>
          </div>


          <div
            {...getRootProps()}
            className={`
            w-full aspect-square max-h-[250px] rounded-2xl 
            border-2 border-dashed transition-all duration-200 
            flex flex-col items-center justify-center p-4 cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'}
          `}
          >
            <input {...getInputProps()} />

            <div className="mb-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#ff9a56] to-[#ff6f56] w-[60px] h-[15px] rounded-t-lg shadow-md absolute -top-[8px] z-10"></div>
                <div className="bg-gradient-to-br from-[#ffe563] to-[#ffc663] w-[90px] h-[60px] shadow-lg rounded-lg"></div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-slate-600 font-medium">
                {file ? file.name : 'Drag & drop your file here'}
              </p>
              <p className="text-sm text-slate-400">
                or click to browse
              </p>
            </div>
          </div>

          <div className="w-36 space-y-4 flex justify-center flex-col items-center">
            <button
              onClick={handelUpload}
              disabled={!file || isLoading}
              className={`
              w-full py-3 rounded-xl font-semibold shadow-lg
              transition-all duration-200 flex items-center justify-center
              ${!file
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isLoading
                    ? 'bg-blue-400 cursor-wait'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-[1.02]'
                }
            `}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Uploading...
                </>
              ) : (
                file ? 'Upload File' : 'Select a file first'
              )}
            </button>

            {fileUrl && (
              <div className="space-y-3 w-full">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  View Uploaded File ↗
                </a>

                <button
                  onClick={handleCopy}
                  className={`
                  w-36 py-2 px-4 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${copied
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}
                `}
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full bg-slate-900/50 backdrop-blur-lg py-4 px-6">
        <div className="container mx-auto flex justify-between items-center text-white/80">
          <h1 className="text-sm font-medium">
            All rights reserved © {new Date().getFullYear()}
          </h1>
          <div className="flex gap-4">
            <a 
              href="https://github.com/Vortex-oo/CloudDrop.git" 
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-blue-400 transition-colors"
            >
              GitHub Link
            </a>
            <a 
              href="https://portfolio-woad-zeta-44.vercel.app/" 
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;