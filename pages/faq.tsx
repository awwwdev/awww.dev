import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import FAQItem from '@/components/ui/FAQItem';
import Space from '@/components/ui/Space';

export async function getServerSideProps({ locale }) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "home", "header", "footer", "faq"])),
    },
  };
}
const Page: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-70rem ">
      <h1 className="H1  mb-4">{t("faq:title")}</h1>
      <Space size='h-12' />
      <FAQItem number={1} question={t("faq:q1")}>
        <p className="">{t("faq:a1")}</p>
      </FAQItem>
      <FAQItem number={2} question={t("faq:q2")}>
        <p className="">{t("faq:a2")}</p>
      </FAQItem>
      <FAQItem number={3} question={t("faq:q3")}>
        <p className="">{t("faq:a3")}</p>
      </FAQItem>
      <FAQItem number={4} question={t("faq:q4")}>
        <p className="">{t("faq:a4")}</p>
      </FAQItem>
      <FAQItem number={5} question={t("faq:q5")}>
        <p className="">{t("faq:a5")}</p>
      </FAQItem>
      <FAQItem number={6} question={t("faq:q6")}>
        <p className="">{t("faq:a6")}</p>
      </FAQItem>
      <FAQItem number={7} question={t("faq:q7")}>
        <p className="">{t("faq:a7")}</p>
      </FAQItem>
      <FAQItem number={8} question={t("faq:q8")}>
        <p className="">{t("faq:a8")}</p>
      </FAQItem>
      <FAQItem number={9} question={t("faq:q9")}>
        <p className="">{t("faq:a9")}</p>
      </FAQItem>
      <FAQItem number={10} question={t("faq:q10")}>
        <p className="">{t("faq:a10")}</p>
      </FAQItem>
      <FAQItem number={11} question={t("faq:q11")}>
        <p className="">{t("faq:a11")}</p>
      </FAQItem>
      <FAQItem number={12} question={t("faq:q12")}>
        <p className="">{t("faq:a12")}</p>
      </FAQItem>
      <FAQItem number={13} question={t("faq:q13")}>
        <p className="">{t("faq:a13")}</p>
      </FAQItem>
      <FAQItem number={14} question={t("faq:q14")}>
        <p className="">{t("faq:a14")}</p>
      </FAQItem>
      <FAQItem number={15} question={t("faq:q15")}>
        <p className="">{t("faq:a15")}</p>
      </FAQItem>
      <FAQItem number={16} question={t("faq:q16")}>
        <p className="">{t("faq:a16")}</p>
      </FAQItem>
    </div>
  );
};

export default Page;
