import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function upload({ user }) {
  return <div>Hello {user.name}</div>;
});
