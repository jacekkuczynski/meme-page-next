type MemeStreamLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const MemeStreamLayout = (props: MemeStreamLayoutProps) => {
  return (
    <div className="flex flex-col items-center w-full mb-24 px-8 pb-8">
      {props.children}
    </div>
  );
};

export default MemeStreamLayout;
