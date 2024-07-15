import Link from "next/link";
import { useTranslation } from "next-i18next";
import { En, Fa } from "./ui/multilang";
import Icon from '@/components/ui/Icon';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-20"></div>
      <footer className="px-4 c-gray9 ">
        <div className="b-t-1 max-w-70rem mx-auto "></div>
        <div className="h-16"></div>
        
        <div className="h-16"></div>
        <div className="max-w-70rem mx-auto">
          <div className="flex flex-wrap gap-4 b-t-1 pt-4">
          <FooterColumn>
              <h2 className="font-bold mb-2">
                <En>Explore</En>
                <Fa>وبسایت</Fa>
              </h2>

              <Link target="_blank" href="/classes" className="mb-2 c-sand11  text-sm  c-orange11">
                Classes
              </Link>
              <Link target="_blank" href="/workshops" className="mb-2 c-sand11  text-sm c-orange11">
                Workshops
              </Link>
              <Link target="_blank" href="/blog" className="mb-2 c-sand11  text-sm c-orange11">
                Blog
              </Link>
            </FooterColumn>
          
            <FooterColumn>
              <h2 className="font-bold mb-2">{t("footer:contact.title")}</h2>
              <Link target="_blank" href="/tutor-application" className="mb-2 c-sand11  c-orange11">
                {t("footer:with.teacher")}
              </Link>
              <Link target="_blank" href="https://wa.me/18773703277" className="mb-2 c-sand11  c-orange11">
                <En>Support</En>
                <Fa>پشتیبانی</Fa>
              </Link>

              <Link target="_blank" href="/contact" className="mb-2 c-sand11  c-orange11">
                {t("footer:contact.contact")}
              </Link>
            </FooterColumn>
        
            <FooterColumn>
              <h2 className="font-bold mb-2">{t("footer:with.title")}</h2>
              <Link target="_blank" href="/faq" className="mb-2 c-sand11  c-orange11">
                {t("footer:with.faq")}
              </Link>

              <Link target="_blank" href="/terms-of-use" className="mb-2 c-sand11  c-orange11">
                {t("footer:with.terms")}
              </Link>
              <Link target="_blank" href="/privacy-policy" className="mb-2 c-sand11  c-orange11">
                {t("footer:with.policy")}
              </Link>
            </FooterColumn>
            <FooterColumn>
              <h2 className="font-bold mb-2">{t("footer:social.title")}</h2>
              <div className="flex  flex-col gap-1  ">
                <Link target="_blank" href="https://instagram.com/darsoononline" className=" c-orange11">
                  <Icon name="bf-i-ph-instagram-logo  before:opacity-100 "/>
                  <span className="text-sm mx-2 c-sand11 c-orange11">Instagram</span>
                </Link>
                <Link target="_blank" href="https://facebook.com/darsoononline" className="c-orange11">
                  <Icon name="bf-i-ph-facebook-logo  before:opacity-100 "/>
                  <span className="text-sm mx-2 c-sand11 c-orange11">Facebook</span>
                </Link>
                <Link target="_blank" href="https://twitter.com/darsoononline" className="c-orange11">
                  <Icon name="bf-i-ph-x-logo  before:opacity-100 "/>
                  <span className="text-sm mx-2 c-sand11 c-orange11">X (Twitter)</span>
                </Link>
              </div>
            </FooterColumn>
          </div>
          <div className="text-center mt-4 pb-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Darsoon Inc. All rights reserved.</p>
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
