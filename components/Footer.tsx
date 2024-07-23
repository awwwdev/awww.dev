
const Footer = () => {

  return (
    <>
      <div className="h-20"></div>
      <footer className="px-4  ">
        <div className=" max-w-page mx-auto "></div>
        <div className="max-w-page mx-auto">
          <div className="b-t-1 b-base4 mt-4 pt-8 pb-4 text-sm c-base11">
            <p>Designed and Developed with love, ofcourse by myself.</p>
            <p>No AI was used during building of this website!</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

function FooterColumn({ children }) {
  return <div className=" flex-grow basis-48 flex flex-col">{children}</div>;
}
