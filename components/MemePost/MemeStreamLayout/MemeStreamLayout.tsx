import { Children } from "react";

type MemeStreamLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const MemeStreamLayout = (props: MemeStreamLayoutProps) => {
  return (
    <div className="flex flex-col items-center w-full my-24">
      {props.children}
    </div>
  );
};

export default MemeStreamLayout;
