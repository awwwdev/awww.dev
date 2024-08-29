import Icon from "./ui/Icon";

const Footer = () => {
  return (
    <>
      <div className="h-20"></div>
      <footer className="px-4 relative isolate ">
        <div className=" absolute bottom-0 left-50% -translate-x-50%  w-full overflow-clip -z-10 pointer-events-none select-none">
          <DotGrid rows={24} cols={24} />
        </div>
        <div className=" max-w-page mx-auto "></div>
        <div className="max-w-page mx-auto">
          <div className="b-t-1 b-base4 mt-4 pt-8 pb-8 text-sm c-base11">
            <p>Designed and Developed with love, ofcourse by myself.</p>
            <p>No AI was used during building of this website!</p>
            <p>
              View the source code{` `}
              <a target='_blank' href="https://github.com/awwwdev/awww.dev">
                in my
                <Icon name="bf-i-bxl-github" className="" />
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

function DotGrid({ rows, cols }) {
  return (
    <div
      className="grid aspect-ratio-1/1  justify-items-center fade-y w-full min-w-50rem opacity-10"
      style={{
        gridTemplateColumns: `repeat(${cols} , 1fr)`,
        gridTemplateRows: `repeat(${rows} , 1fr)`,
        // gap: `calc((100% - ${rows} * 0.25rem) / ${rows - 1})`,
        maskImage: "linear-gradient(to top, black 0%, black 20%,  transparent 60%)",
        WebkitMaskImage: "linear-gradient(to top, black  0%, black 20%, transparent 60%)",
      }}
    >
      {Array.from(Array(rows * cols).keys()).map((i) => {
        return (
          <div key={`dot-${i}`} className={`rd-full  w-1 h-1 `}>
            +
          </div>
        );
      })}
    </div>
  );
}
