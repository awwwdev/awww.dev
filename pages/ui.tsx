import Icon from "@/components/ui/Icon";
import Space from "@/components/ui/Space";
import Button from "@/components/ui/button";
import { En, Fa } from "@/components/ui/multilang";
import { NextPage } from "next";
import { useId } from "react";
const Page: NextPage = () => {
  return (
    <div className="mx-auto max-w-page space-y-20">
      <Section title={"test"}>
        <p>Test stuff here</p>      
      </Section>
      <IconsSection />
      <ShadowsSection />
      <ButtonsSection />
      <Fa>
        <TypographyFarsiSection />
      </Fa>
      <En>
        <TypographyEnglishSection />
      </En>
    </div>
  );
};

export default Page;

function IconsSection() {
  return (
    <Section title="Icons">
      <div className="flex ">
        <p className="flex  font-display">
          <span className="bg-red4">This is an icon testing</span>
          <Icon name="bf-i-ph-plus" />
        </p>
        <p className=" items-baseline ">
          <Icon name="bf-i-ph-plus " />
          <span className="bg-red4">این سک تست است </span>
        </p>
      </div>
    </Section>
  );
}

function Section({ title, className = "", children }) {
  const headerId = useId();
  return (
    <section className={className} aria-labelledby={headerId}>
      <h1 className="H1" id={headerId}>
        {title}
      </h1>
      <Space size="h-8" />

      {children}

      <div className="b-t-2 b-sand5"></div>
    </section>
  );
}

function ShadowsSection() {
  return (
    <Section title="Shadows">
      <h1 className="H3">Shadows</h1>
      <div className="h-16"></div>
      <ul className="flex flex-wrap gap-16 bg-gray1 py-32 px-4">
        <div className="w-32 h-32 bg-white rd-4 shd-1"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-2"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-3"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-4"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-5"></div>
      </ul>
      <h2 className="H2">Tinted</h2>
      <ul className="flex flex-wrap gap-16  py-32 px-4">
        <div className="w-32 h-32 bg-white rd-4 shd-tinted-1"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-tinted-2"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-tinted-3"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-tinted-4"></div>
        <div className="w-32 h-32 bg-white rd-4 shd-tinted-5"></div>
      </ul>
    </Section>
  );
}

function ButtonsSection() {
  return (
    <Section title="Buttons">
      <div className="flex gap-3 text-base flex-wrap b-b-1 b-sand4 py-6">
        <Button isLoading variation="text-accent">Button </Button>
        <Button isLoading variation="soft-accent">Button Ghost</Button>
        <Button isLoading variation="soft">Button Ghost</Button>
        <Button isLoading variation="ghost">Button Ghost</Button>
        <Button isLoading variation="ghost-accent">Button Ghost</Button>
        <Button isLoading variation="text">Button Text</Button>
        <Button isLoading variation="solid">Button Solid</Button>
        <Button isLoading variation="solid">Button Solid</Button>
        <Button isLoading variation="solid-accent">Button Solid Primary</Button>
        <Button isLoading variation="solid-accent" className="">
          Button
        </Button>
      </div>
      <div className="flex gap-3 text-base flex-wrap b-b-1 b-sand4 py-6">
        <Button variation="text-accent">Button </Button>
        <Button variation="soft-accent">Button Ghost</Button>
        <Button variation="soft">Button Ghost</Button>
        <Button variation="ghost">Button Ghost</Button>
        <Button variation="ghost-accent">Button Ghost</Button>
        <Button variation="text">Button Text</Button>
        <Button variation="solid">Button Solid</Button>
        <Button variation="solid">Button Solid</Button>
        <Button variation="solid-accent">Button Solid Primary</Button>
        <Button variation="solid-accent" className="">
          Button
        </Button>
      </div>
      <h2 className="H4">Buttons with Icons</h2>
      <div className="flex gap-3 items-center text-base flex-wrap b-b-1 b-sand4 py-6">
        <Button className="" variation="ghost" iconButton>
          <Icon name="bf-i-ph-arrow-up" />
        </Button>
      </div>
      <h2 className="H4">Buttons Sizes</h2>
      <div className="flex gap-3 items-center text-base flex-wrap b-b-1 b-sand4 py-6">
        <Button className="text-xs" variation="ghost">
          Button Ghost
        </Button>
        <Button className="text-sm" variation="ghost">
          Button Ghost
        </Button>
        <Button className="text-base" variation="ghost">
          Button Ghost
        </Button>
        <Button className="text-lg" variation="ghost">
          Button Ghost
        </Button>
        <Button className="text-xl" variation="ghost">
          Button Ghost
        </Button>
      </div>
      <h2 className="H4">Disabled Buttons</h2>
      <div className="flex gap-3 text-base flex-wrap b-b-1 b-sand4 py-6">
        <Button disabled variation="text-accent">
          Button Ghost
        </Button>
        <Button disabled variation="soft-accent">
          Button Ghost
        </Button>
        <Button disabled variation="soft">
          Button Ghost
        </Button>
        <Button disabled variation="ghost">
          Button Ghost
        </Button>
        <Button disabled variation="ghost-accent">
          Button Ghost
        </Button>
        <Button disabled variation="text">
          Button Text
        </Button>
        <Button disabled variation="solid">
          Button Solid
        </Button>
        <Button disabled variation="solid">
          Button Solid
        </Button>
        <Button disabled variation="solid-accent">
          Button Solid Primary
        </Button>
        <Button disabled variation="solid-accent" className="text-lg">
          Button
        </Button>
      </div>
    </Section>
  );
}

function TypographyFarsiSection() {
  return (
    <Section title="تایپوگرافی - فارسی" className="max-w-50rem mx-auto">
      <h1 className="large-title line-height-1">متن هیرو</h1>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
      </p>
      <h1 className="H1 line-height-1">تیترتی ترتیت رتیت رتیتر ۱</h1>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
      </p>
      <h2 className="H2">تیتر ۲</h2>
      <h3 className="H3">تیتر ۳</h3>
      <h4 className="H4">تیتر ۴</h4>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
        متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
        پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
        طراحی اساسا مورد استفاده قرار گیرد.
      </p>
      <h4 className="H4">هدینگ ۴</h4>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
        متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
        پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
        طراحی اساسا مورد استفاده قرار گیرد.
      </p>
      <h3 className="H3">هدینگ ۳</h3>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
        متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
        پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
        طراحی اساسا مورد استفاده قرار گیرد.
      </p>
      <h2 className="H2">هدینگ ۲</h2>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
        متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
        پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
        طراحی اساسا مورد استفاده قرار گیرد.
      </p>
    </Section>
  );
}

function TypographyEnglishSection() {
  return (
    <Section title="Typography - English" className="max-w-50rem mx-auto">
      <h1 className="large-title">Large Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quam similique quis quidem architecto suscipit
        corporis rerum rem eligendi eum alias voluptatum blanditiis temporibus ut ipsum perferendis, dolore esse
        deleniti.
      </p>
      <h1 className="H1">Heading 1</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quam similique quis quidem architecto suscipit
        corporis rerum rem eligendi eum alias voluptatum blanditiis temporibus ut ipsum perferendis, dolore esse
        deleniti.
      </p>
      <h2 className="H2">Heading 2</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quam similique quis quidem architecto suscipit
        corporis rerum rem eligendi eum alias voluptatum blanditiis temporibus ut ipsum perferendis, dolore esse
        deleniti.
      </p>
      <h3 className="H3">Heading 3</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quam similique quis quidem architecto suscipit
        corporis rerum rem eligendi eum alias voluptatum blanditiis temporibus ut ipsum perferendis, dolore esse
        deleniti.
      </p>
      <h4 className="H4">Heading 4</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quam similique quis quidem architecto suscipit
        corporis rerum rem eligendi eum alias voluptatum blanditiis temporibus ut ipsum perferendis, dolore esse
        deleniti.
      </p>
    </Section>
  );
}
