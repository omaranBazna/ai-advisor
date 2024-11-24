import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropComponent = ({ onFilesDropped }) => {
  const [files, setFiles] = useState([]); // To store uploaded file metadata

  const onDrop = useCallback((acceptedFiles) => {
    console.log('Dropped files:', acceptedFiles);

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

  return (
    <div style={{ textAlign: 'center' }}>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileDropComponent;
