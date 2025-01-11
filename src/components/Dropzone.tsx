// FileDropzone.tsx
import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";

type FileWithPreview = File & { preview: string };

interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void;
  hasHero: boolean;
}

const FileDropzone = ({ onFilesChange, hasHero }: FileDropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [hero, setHero] = useState(-1);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesChange([...files, ...newFiles]); // Pass updated files to parent
    },
    [files, onFilesChange]
  );

  const handleDelete = (file: FileWithPreview) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="dropzone-container">
      <div className="border-2 border-dashed border-gray-400 rounded-sm p-4 text-center cursor-pointer">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <p className="text-4xl text-blue-800">تصاویر / ویدئو ها</p>
              <br />
              <p className="text-md text-gray-400">
                عکس ها و ویدئو های خود را اینجا بکشید یا در محیط کلیک کنید
              </p>
            </div>
          )}
        </Dropzone>
      </div>
      <div className="preview-container mt-4">
        {files.map((file, index) => (
          <div
            key={file.name}
            className={`flex items-center space-x-4 p-2 rounded-md mt-1 ${
              index === hero ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {file.type.startsWith("image/") && (
              <img
                src={file.preview}
                alt={file.name}
                className="w-12 h-12 object-cover rounded-md ml-4"
              />
            )}
            {/* Filename with truncation */}
            <span className="flex-1 truncate">{file.name}</span>

            {/* Buttons */}
            <div className="flex-shrink-0 flex space-x-2">
              <input type="hidden" name="hero_image" value={hero} />
              <button
                onClick={() => {
                  if (!hasHero) setHero(0);
                  handleDelete(file);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                حذف
              </button>
              {index !== hero && (
                <button
                  onClick={() => setHero(index)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  پس زمینه
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDropzone;
