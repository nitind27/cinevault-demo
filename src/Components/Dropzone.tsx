"use client";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex justify-center items-center flex-col max-w-[473px] text-white max-h-[504px] h-[504px] border-2 border-dashed rounded-md cursor-pointer transition-all duration-200 ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {image ? (
        <img src={image as string} alt="Selected" className="max-w-full max-h-full object-cover" />
      ) : (
        <>
          <Download size={16} />
          {isDragActive ? (
            <p className="text-blue-500">Drop the files here ...</p>
          ) : (
            <p className="text-white mt-2">Upload an image here</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dropzone;
