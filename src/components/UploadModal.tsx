import { useState } from "react";
import { Image } from "react-bootstrap-icons";
import FileDropzone from "./Dropzone";

const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [files, setFiles] = useState([] as File[]);

  const onFileUpload = () => {  
    console.log(
      "___________________________ FILES ___________________________"
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col justify-center items-center bg-blue-500 text-white px-5 py-4 rounded-full hover:bg-blue-600 shadow-md transition-all duration-150 fixed left-4 bottom-4"
      >
        <Image className="text-2xl font-bold"></Image>
        <p>تصاویر</p>
      </button>
      {isOpen && (
        <form>
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

            {/* <!-- Modal container --> */}
            <div className="fixed inset-0 z-30 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
              <div className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                {/* <!-- Modal content --> */}
                <div className="bg-white px-6 py-5 sm:px-8 max-h-[80vh] overflow-y-auto">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:text-left w-full">
                      {/* <!-- Replace this FileDropzone with actual component rendering --> */}
                      <FileDropzone
                        hasHero={true}
                        onFilesChange={onFileUpload}
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Actions --> */}
                <div className="bg-gray-100 border-t px-8 py-4 flex justify-end space-x-reverse space-x-2">
                  <button
                    type="button"
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    بازگشت
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                    // onClick={onSubmit}
                  >
                    آپلود
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UploadModal;
