import Tools from "@/components/home-page-sections/Tools";
import BroswerFrame from "./_mockup-components/BrowserFramer";

function Browser({ children }) {
  return (
    <BroswerFrame className="w-240 aspect-ratio-4/3 bf-shadow-layer before:bg-blue9 before:blur-100 before:m-10">
      {children}
    </BroswerFrame>
  );
}
const gap = 'gap-32'

export default function Mockup() {
  return (
    <div className='light-theme'>
      <IsomatricView rotateX={23} rotateZ={-15}>
        <div
          className={`grid ${gap} justify-center  scale-50 transform-origin-tc`}
          style={{ gridTemplateColumns: "auto auto auto" }}
        >
          <div className={`grid ${gap} pt-100`}>
            <Browser>
              <div className="h-full grid items-cneter">
                <Tools />
              </div>
            </Browser>
          </div>
          <div className={`grid ${gap} pt-0`}>
            <Browser>
              <div className="h-full grid items-cneter">
                <Tools />
              </div>
            </Browser>
            <Browser>
              <div className="h-full grid items-cneter">
                <Tools />
              </div>
            </Browser>
          </div>
          <div className={`grid ${gap} pt-60`}>
            <Browser>
              <div className="h-full grid items-cneter">
                <Tools />
              </div>
            </Browser>
          </div>
        </div>
      </IsomatricView>
    </div>
  );
}

function IsomatricView({ children, rotateX = 60, rotateY = 0, rotateZ = 45, disable = false }) {
  return (
    <div
      style={
        disable
          ? {}
          : {
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
            }
      }
    >
      {children}
    </div>
  );
}
