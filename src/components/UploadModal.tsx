import { FormEvent, useState } from "react";
import FileDropzone from "./Dropzone";
import { uploadMedia } from "../services/productService";
import { SYNCING_MSG, UPLOADING_MSG } from "../types/messages";

interface props {
  onUploadedFiles: () => void;
  onClose: () => void;
}

const UploadModal = ({ onUploadedFiles, onClose }: props) => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([] as File[]);

  const onFileUpload = (medias: File[]) => setFiles(medias);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData();
    files.forEach((file) => form.append("files", file));

    uploadMedia(form, (percentage) => {
      setProgress(percentage);
      return onClose();
    }).then(() => {
      onUploadedFiles();
      setProgress(0);
    });
  };

  return (
    <>
      {progress > 0 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col justify-center items-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
            <div
              className={`ml-2 w-12 h-12 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin ${
                progress < 100 ? "border-t-red-500" : "border-t-green-500"
              }`}
            ></div>
            <p className="text-lg font-medium text-gray-700">
              {progress < 100 ? UPLOADING_MSG : SYNCING_MSG}
            </p>
            {progress < 100 && (
              <p className="text-lg font-medium text-gray-700">
                {progress + "%"}
              </p>
            )}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* <!-- Background overlay --> */}
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-30 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
              {/* <!-- Modal content --> */}
              <div className="bg-white px-6 py-5 sm:px-8 max-h-[80vh] overflow-y-auto">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:text-left w-full">
                    {/* <!-- Replace this FileDropzone with actual component rendering --> */}
                    <FileDropzone onFilesChange={onFileUpload} />
                  </div>
                </div>
              </div>

              {/* <!-- Actions --> */}
              <div className="bg-gray-100 border-t px-8 py-4 flex justify-end space-x-reverse space-x-2">
                <button
                  type="button"
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
                  onClick={onClose}
                >
                  بازگشت
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                >
                  آپلود
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadModal;
