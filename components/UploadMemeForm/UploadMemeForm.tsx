import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/initializeFirebase";
import { v4 as uuidv4 } from "uuid";

const UploadMemeForm = () => {
  const [postTitle, setPostTitle] = useState<null | string>(null);
  const [fileInput, setFileInput] = useState<any>();
  const [titleError, setTitleError] = useState<null | string>(null);

  const getUuid = () => {
    return uuidv4();
  };

  const handleTitleChange = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let file = event.target.files[0];
      setFileInput(file);
    }
  };

  useEffect(() => {
    console.log(fileInput);
  }, [fileInput]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storageRef = ref(storage, `/memes/${getUuid()}`);
    const uploadTask = uploadBytesResumable(storageRef, fileInput);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col my-12 gap-4 justify-around items-center"
      >
        <h3 className="h3 text-left">Upload a post</h3>

        <input
          onChange={handleTitleChange}
          type="text"
          placeholder="Title..."
          className="block w-64 border border-blue-600 focus:outline-none  p-1 rounded-lg shadow-lg"
        ></input>

        <div className={`${titleError ? "block" : "hidden"} text-red-700`}>
          {titleError}
        </div>

        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 font-medium rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
          <CloudArrowUpIcon className="w-8 h-8" />
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            className="hidden"
          />
        </label>

        <button type="submit" className={`button`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadMemeForm;
