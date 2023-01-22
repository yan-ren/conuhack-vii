import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/posts";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

// Get the current id
const Form = () => {
  const [showForm, setShowForm] = useState(false);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    points: 0,
  });
  const dispatch = useDispatch();
  const post = useSelector((state) => null);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ ...postData }));
    setShowForm(false);
    clear();
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        file.width,
        file.width,
        "JPEG",
        30,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const onDrop = useCallback(
    (acceptedFiles) => {
      var file = acceptedFiles[0];
      const preview = document.querySelector("#preview");
      const reader = new FileReader();
      reader.onload = async () => {
        const image = await resizeFile(file);
        // console.log(image);
        setPostData({ ...postData, selectedFile: image });
        if (file) {
          preview.src = image;
          preview.classList.remove("hidden");
        }
        // console.log(event.target.result);
      };
      // update reader to make preview work
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [postData]
  );

  // use this callback function to remove preview when the file dialog is opened (o/w users may think they uploaded the file since there is preview but actually no file is uploaded)
  const onFileDialogOpen = useCallback((acceptedFiles) => {
    var file = acceptedFiles;
    const preview = document.querySelector("#preview");
    if (!file) {
      preview.classList.add("hidden");
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      onFileDialogOpen,
      accept: {
        "image/jpg": [".jpg", ".png", ".webp", ".jpeg"],
      },
      multiple: false,
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.path} className="break-words">
      {/* {file.path} - {file.size} bytes */}
      File Uploaded: <br /> ➡️ {file.path}
    </li>
  ));

  const inputStyle =
    "mt-1 block w-full rounded-md dark:text-gray-700 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

  const fileInputStyle =
    "mt-1 block w-full text-base text-gray-700 bg-gray-100 dark:bg-gray-200 rounded-md cursor-pointer shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-gray-300 dark:border-gray-400 dark:border-3 border-dashed rounded-lg px-3 py-5";

  return (
    <>
      <div className="w-full text-center">
        <div className="text-2xl font-bold flex justify-center mb-2">
          Welcome to Sharing!
        </div>
        <div className="text-base flex justify-center mb-4">
          Share something with the team!
        </div>
        <button
          type="button"
          className="btn btn-primary px-4 sm:px-6 min-h-0 h-10 mb-4"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Create New Post
        </button>
      </div>

      {showForm && (
        <div>
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => {
                    setShowForm(false);
                    clear();
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="py-6 px-6 lg:px-8">
                  <div className="text-2xl font-bold">Creating a Post</div>
                  <div className="mt-4 w-full">
                    <form
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}
                      className="grid grid-cols-1"
                    >
                      <label className="block mb-6">
                        <span>Title</span>
                        <input
                          type="text"
                          className={inputStyle}
                          value={postData.title}
                          onChange={(e) =>
                            setPostData({ ...postData, title: e.target.value })
                          }
                        />
                      </label>
                      <label className="block mb-6">
                        <span>Message</span>
                        <textarea
                          className={inputStyle + " resize-none"}
                          value={postData.message}
                          rows="3"
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              message: e.target.value,
                            })
                          }
                        ></textarea>
                      </label>
                      <label className="block mb-6">
                        <span>Tags (Separate them using commas ',')</span>
                        <input
                          type="text"
                          className={inputStyle}
                          value={postData.tags}
                          placeholder="tag1,tag2,tag3..."
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              tags: e.target.value.split(","),
                            })
                          }
                        />
                      </label>
                      <label className="block mb-6">
                        <span>
                          File Uploads (Only *.jpeg/jpg/png images accepted)
                        </span>
                        <span className="sr-only">Choose profile photo</span>
                        <div
                          {...getRootProps({
                            className: fileInputStyle,
                          })}
                        >
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the file here ...</p>
                          ) : (
                            <p>
                              Drag 'n' drop the file here, or click to select
                              file
                            </p>
                          )}
                        </div>
                        <aside className="mt-2">
                          <ul>{files}</ul>
                          <img
                            src=""
                            id="preview"
                            alt="preview"
                            className="hidden"
                          />
                        </aside>
                      </label>
                      <label className="block mb-6">
                        <span>How do you rate your onboarding so far?</span>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          className={inputStyle}
                          value={postData.points}
                          onChange={(e) =>
                            setPostData({ ...postData, points: e.target.value })
                          }
                        />
                      </label>
                      <label className="block mb-2">
                        <span className="sr-only">Submit Button</span>
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                        >
                          Submit
                        </button>
                      </label>
                      <label className="block">
                        <span className="sr-only">Clear Button</span>
                        <button
                          type="button"
                          onClick={clear}
                          className="btn btn-ghost w-full"
                        >
                          Clear
                        </button>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </>
  );
};

export default Form;
