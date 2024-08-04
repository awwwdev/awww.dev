"use client";
import Modal from "../ui/modal";

export default function WorkItem({
  title,
  gridRow,
  gridColumn,
  className = "",
  imgSrc,
  subtitle,
  description,
  tools,
  categories,
}) {
  return (
    <li style={{ gridRow, gridColumn }}>
      <Modal
        trigger={
          <button type="button" className="h-full w-full text-left ">
            <WorkItemCard {...{ title, subtitle, className, imgSrc }} />
          </button>
        }
      >
        <WorkItemModalContent {...{ title, imgSrc, description, subtitle }} />
      </Modal>
    </li>
  );
}

function WorkItemCard({ title, gridRow, gridColumn, className = "", imgSrc }) {
  return (
    <div
      className="h-full rd-3 bg-base1A grid overflow-clip b-t-1 b-l-1 b-r-1 b-base4 sahdow-xl bg-clip-padding"
      style={{
        gridTemplateRows: "auto 1fr",
        backgroundImage: "url('/static/noise.svg')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="p-3 xs:p-6 ">
        <h3 className="font-display">{title}</h3>
      </div>
      <div className="grid items-end pl-6  xs:pl-16">
        <div className=" relative isolate">
          <img
            src={imgSrc}
            alt=""
            className="min-w-0 rd-lt-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-50 -z-10"
          />
          <img src={imgSrc} alt="" className="min-w-0 rd-lt-3 shadow-xl object-cover" />
        </div>
      </div>
    </div>
  );
}

function WorkItemModalContent({ title, gridRow, gridColumn, imgSrc, description, subtitle }) {
  return (
    <div className="">
      <h3 className="font-display">{title}</h3>
      <div className="h-3"></div>
      <p>{subtitle}</p>
      <p>{description}</p>
      <p className="c-base11">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit commodi quidem impedit esse, voluptatum
        inventore quaerat veniam necessitatibus id, officia quos explicabo magni rerum, aliquid unde soluta cumque sit.
        Consectetur!
      </p>

      <div className="h-3"></div>

<div className="flex justify-center">

      <div className=" relative isolate">
        <img
          src={imgSrc}
          alt=""
          className="min-w-0 rd-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-50 -z-10"
          />
        <img src={imgSrc} alt="" className="min-w-0 rd-3 shadow-xl object-cover" />
      </div>
    </div>
          </div>
  );
}
