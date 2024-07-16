import { useRouter } from "next/router";
import persianJs from "persianjs";
import { useState } from "react";
import Icon from '../Icon';

export default function FAQItem({ question, children, number }) {
  const router = useRouter();
  const { locale } = router;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <details
      className="mb-4"
      open={isOpen}
      onToggle={(e) => {
        setIsOpen(e.target.open);
      }}
    >
      <summary className=" flex items-center font-medium text-lg gap-2 shd-tinted-5 rd-4"
  
      >
        {/* <div role="none" className=" w-24 h-24 text-2xl font-display flex justify-center items-center rounded-lg bg-brand-light-amber text-accent-10">
          {locale === "fa"
            ? persianJs(number).englishNumber().toString()
            : number}
        </div> */}

        <div className=" shd-tinted-2 b-1 b-white flex items-center bg-white/65  px-4 py-4 sm:py-8  sm:px-8 fw-600 rd-4 w-full "
        style={{
          backgroundImage: "url('/static/noise.svg')",
          backgroundSize: 'auto',
          backgroundRepeat: "repeat"
          // mix-blend-mode: screen;
          // mixBlendMode: "hue"
        }}
        >
          <div className="flex items-center w-full gap-2 sm:gap-4">
            <div className=" sm:text-xl">{question}</div>

            <div className="mis-auto c-brand-amber text-2xl lt-sm:p-2">
              {isOpen ? (
                <Icon name="bf-i-ph-minus-bold before:opacity-100"/>
              ) : (
                <Icon name="bf-i-ph-plus-bold before:opacity-100"/>
              )}
            </div>
          </div>
        </div>
      </summary>

      <div className={` mt-2 sm:text-xl  p-4 sm:p-8 rd-b-4`}>{children}</div>
    </details>
  );
}
