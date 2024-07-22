import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/button";
import Switch from "../ui/Switch";

export default function Hero() {
  return (
    <div>
      <DesktopHero />
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="relative ">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-crimson3" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue2" blur="200px" />

      <div className="max-w-page mx-auto">
        <GridSection />
      </div>
    </section>
  );
}

function GridSection() {
  return (
    <div className="flex flex-wrap lgrid gap-3 grid-auto-flows-col-dense grid-cols-2">

<div className="flex flex-row gap-8 items-center w-fit     ">
        <Image
          src="/profile-picture.png"
          width={200}
          height={200}
          className={`object-cover w-30 h-30 rd-full bg-sand3 `}
          alt=""
          priority
        ></Image>
          <p className="font-display fs-3xl fw-500 line-height-0.8">
            Hello! <br /> Im' Hamid.
          </p>
      </div>

      <Plate>
        <Input
          placeholder="Search..."
          prefix={<Icon name="bf-i-ph-magnifying-glass" />}
        />
        <Switch label='Hello' />
      </Plate>

      <Plate>
        <Checkbox label="Checkbox" />
      </Plate>
      <p className="font-display fs-3xl fw-500"> I design and <br /> develope websites.</p>

      <Plate>
        <div className="flex gap-3">
          <FontSample size="xs" className="fs-xs" />
          <FontSample size="sm" className="fs-sm" />
          <FontSample size="md" className="fs-md" />
          <FontSample size="lg" className="fs-lg" />
          <FontSample size="xl" className="fs-xl" />
          <FontSample size="2xl" className="fs-2xl" />
        </div>
      </Plate>
      <Plate>
        <Button variation="ghost" className='flex gap-3 items-center'>
          <Icon name="bf-i-ph-chef-hat" subdued />
          Make a Toast
        </Button>
      </Plate>
      <CodePlate />
      <MusicPlayerPlate />
      <ColorPalettePlate />
      <TogglePlate />
    </div>
  );
}

function TogglePlate() {
  return (
    <Plate>
      <div className="grid gap-1.5">
        <Switch />
      </div>
    </Plate>
  );
}

function ColorPalettePlate() {
  return (
    <Plate>
      <div className="flex gap-1.5">
        <ColorNode className="bg-blue1" />
        <ColorNode className="bg-blue2" />
        <ColorNode className="bg-blue3" />
        <ColorNode className="bg-blue4" />
        <ColorNode className="bg-blue5" />
        <ColorNode className="bg-blue6" />
        <ColorNode className="bg-blue7" />
        <ColorNode className="bg-blue8" />
        <ColorNode className="bg-blue9" />
      </div>
    </Plate>
  );
}

function ColorNode({ className }) {
  return <div className={`${className} w-5 h-5 rd-full `}></div>;
}

function MusicPlayerPlate() {
  return (
    <Plate>
      <div>
        <div className=" flex gap-3 items-center">
          <Button variation="soft" iconButton rounded className="fs-sm">
            <Icon name="bf-i-ph-skip-back" />
          </Button>
          <Button variation="solid" iconButton rounded className="fs-xl">
            <Icon name="bf-i-ph-play" />
          </Button>
          <Button variation="soft" iconButton rounded className="fs-sm">
            <Icon name="bf-i-ph-skip-forward" />
          </Button>
        </div>
        <div>{/* <Slider /> */}</div>
      </div>
    </Plate>
  );
}

function CodePlate() {
  return (
    <Plate>
      <div className="">
        <div className="bg-base5 -mx-4 -mt-4 rd-t-4 mb-4  h-8 min-w-50"></div>
        <code>
          <pre>
            &lt;div&gt;
            <br />
            ...
            <br />
            &lt;/div&gt;
          </pre>
        </code>
      </div>
    </Plate>
  );
}

function FontSample({ className, size }) {
  return (
    <div className="">
      <div className="flex flex-col gap-1 items-center">
        <div className={`font-display ${className} h-10 flex items-end`}>Aa</div>
        <div className="text-xs c-base11">{size}</div>
      </div>
    </div>
  );
}

function Plate({ children }) {
  return <div className="p-4 rd-4 shadow-lg bg-sand3 w-fit">{children}</div>;
}

function DesktopHeroImage() {
  return (
    <div className={` flex  items-center  `}>
      <div className="relative  flex justify-center items-center   ">
        {/* <Circle /> */}
      </div>
    </div>
  );
}
