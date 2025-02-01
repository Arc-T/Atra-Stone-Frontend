// FileDropzone.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";

type FileWithPreview = File & { preview: string };

interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void;
}

const FileDropzone = ({ onFilesChange }: FileDropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const filesRef = useRef(files);

  // Helper function to create a preview for a file
  const createPreview = (file: File): FileWithPreview => {
    return Object.assign(file, { preview: URL.createObjectURL(file) });
  };

  // Update both state and ref
  const updateFiles = (newFiles: FileWithPreview[]) => {
    filesRef.current = newFiles;
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(createPreview);
      updateFiles([...filesRef.current, ...newFiles]);
    },
    [onFilesChange]
  );

  const handleDelete = (file: FileWithPreview) => {
    const updatedFiles = filesRef.current.filter((f) => f !== file);
    updateFiles(updatedFiles);

    // Revoke the object URL for the deleted file
    URL.revokeObjectURL(file.preview);
  };

  // Cleanup function for revoking object URLs
  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  return (
    <div className="dropzone-container">
      {/* Dropzone */}
      <div className="border-2 border-dashed border-gray-400 rounded-sm p-4 text-center cursor-pointer">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <p className="text-4xl text-blue-800">تصاویر / ویدئو ها</p>
              <p className="text-md text-gray-400">
                عکس ها و ویدئو های خود را اینجا بکشید یا در محیط کلیک کنید
              </p>
            </div>
          )}
        </Dropzone>
      </div>

      {/* File Preview */}
      <div className="preview-container mt-4">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center space-x-4 p-2 rounded-md mt-1 bg-gray-200"
          >
            {file.type.startsWith("image/") && (
              <img
                src={file.preview}
                alt={file.name}
                className="w-12 h-12 object-cover rounded-md ml-4"
              />
            )}
            <span className="flex-1 truncate">{file.name}</span>
            <button
              onClick={() => handleDelete(file)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              aria-label={`حذف ${file.name}`}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDropzone;
