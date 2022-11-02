import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UploadMemeForm from "../components/UploadMemeForm/UploadMemeForm";

export default withPageAuthRequired(function upload({ user }) {
  return (
    <>
      <UploadMemeForm />
    </>
  );
});
