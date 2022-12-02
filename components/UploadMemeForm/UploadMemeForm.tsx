import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/initializeFirebase";
import { v4 as uuidv4 } from "uuid";
import { handleUploadMemeDataToDb } from "../../utils/handleUploadMeme";

interface UploadMemeFormProps {
  userNickname: string;
}

const UploadMemeForm = ({ userNickname }: UploadMemeFormProps) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [fileInput, setFileInput] = useState<null | File>(null);
  const [titleError, setTitleError] = useState<null | string>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (postTitle.length < 4) {
      setTitleError("Minimum title length is 4");
      setIsSubmitEnabled(false);
    } else if (postTitle.length >= 4 && fileInput) {
      setIsSubmitEnabled(true);
      setTitleError("");
    } else if (postTitle.length >= 4) {
      setTitleError("");
    }
  }, [postTitle, fileInput]);

  const getUuid = () => {
    return uuidv4();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let file = event.target.files[0];
      setFileInput(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storageRef = ref(storage, `/memes/${getUuid()}`);
    if (fileInput) {
      const uploadTask = uploadBytesResumable(storageRef, fileInput);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            handleUploadMemeDataToDb({
              upvoteCount: 0,
              downvoteCount: 0,
              memeTitle: postTitle,
              fileURL: url,
              username: userNickname,
              userAvatarURL: "",
            })
              .then((res) => {
                console.log(res.id, "res");
                window.location.replace(`/post/${res.id}`);
              })
              .then(() => {
                setFileInput(null);
                setPostTitle("");
                if (inputTitleRef.current) inputTitleRef.current.value = "";
              });
          });
        }
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col my-12 gap-4 justify-around items-center"
      >
        <h3 className="h3 text-left">Upload a post</h3>

        <input
          ref={inputTitleRef}
          onChange={handleTitleChange}
          type="text"
          placeholder="Title..."
          className="block w-64 border border-blue-600 focus:outline-none  p-1 rounded-lg shadow-lg"
        ></input>

        <div
          className={`${
            titleError && postTitle.length > 0 ? "visible" : "invisible"
          } text-red-700 block`}
        >
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

        <div>{fileInput?.name}</div>

        {isSubmitEnabled ? (
          <button type="submit" className="button">
            Submit
          </button>
        ) : (
          <button type="submit" className="button-disabled" disabled>
            Submit
          </button>
        )}
      </form>
    </>
  );
};

export default UploadMemeForm;
