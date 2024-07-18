import Link from "next/link";
import { useTranslation } from "next-i18next";
import { En, Fa } from "./ui/multilang";
import Icon from "@/components/ui/Icon";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-20"></div>
      <footer className="px-4  ">
        <div className=" max-w-page mx-auto "></div>
        <div className="max-w-page mx-auto">
          <div className="text-center mt-4 pb-4 text-sm c-base11">
            <p>Designed and Developed with love.</p>
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
