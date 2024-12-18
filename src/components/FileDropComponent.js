import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileDropComponent = ({ onFilesDropped ,setStudentCourses}) => {
  const [files, setFiles] = useState([]); // To store uploaded file metadata
  const [uploadedFile,setUploadedFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {

    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    if (onFilesDropped) {
      onFilesDropped(acceptedFiles);
    }
  }, [onFilesDropped]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.html', // Accept only HTML files
    multiple: true, // Allow multiple files
  });

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleFileUpload = async(e) => {

    let file = (e.target.file.files[0])
    e.preventDefault();
    

    if (!file) {
      alert("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file); // The key 'file' must match Flask's expected key
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly set for Axios
        },
      });

      setStudentCourses(response.data);
    } catch (error) {
      console.error("Error uploading file:", error.response || error);
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleFileUpload} method="POST" enctype="multipart/form-data"> 
        <input type="file" name="file" multiple /> 
        <input type = "submit" value="Upload"/> 
    </form> 
      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #007bff',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: isDragActive ? '#f0f8ff' : '#f8f9fa',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the HTML files here...</p>
        ) : (
          <p>Drag & drop HTML files here, or click to select files</p>
        )}
      </div>

      {/* File Name Previews with Remove Option */}
      <div
        style={{
          marginTop: '20px',
          textAlign: 'left',
          maxWidth: '400px',
          margin: 'auto',
        }}
      >
        <h4>Uploaded Files:</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {files.map((file, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{file.name}</strong> <br />
                <small>Size: {Math.round(file.size / 1024)} KB</small>
              </div>
              <button
                onClick={() => removeFile(file.name)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
              <button
              onClick={()=>{
                  handleFileUpload(file);
              }}
              style={{
                borderRadius:3,
                margin:10,
                background:"lightgreen",
                padding:5,
                border:"none",
                outline:"none",
                color:'white'
                
              }}
              >
                Process
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileDropComponent;
