export default function BroswerFrame({ children , className }) {
  return (
    <div className={`grid b-base4 b-1  ${className}`} style={{ gridTemplateRows: "auto 1fr" }}>
      <Toolbar />
      <div className='min-h-50 bg-base1 overflow-clip rd-b-3'>{children}</div>
    </div>
  );
}

function Toolbar() {
  return (
    <div
      className="grid bg-base3 p-2 px-4 rd-t-3"
      style={{
        gridTemplateColumns: "1fr 3fr 1fr",
      }}
    >
      <WindowButtons />
      <AddressBar address="example.com" />
      <ActionButtons />
    </div>
  );
}

function WindowButtons() {
  return (
    <div className="flex gap-1.5 items-center">
      <div className="w-4 h-4 rd-full bg-red9"></div>
      <div className="w-4 h-4 rd-full bg-green9"></div>
      <div className="w-4 h-4 rd-full bg-yellow9"></div>
    </div>
  );
}

function AddressBar({ address }) {
  return (
      <div className="rd-2 b-1 b-base5 p-1 flex ">
        <div className="bf-ph-i-x shrink-0"></div>
        <div className='grow text-center c-base11'>{address}</div>
      </div>
  );
}

function ActionButtons() {
  return (
    <div className='flex justify-end items-center'>
      <div className="bf-i-ph-list"></div>
    </div>
  );
}
