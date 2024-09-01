import LinkButton from "@/components/ui/button/LinkButton";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import GradientBorderOverlay from "../ui/GradientBorderOverlay";

export default function ContactMe() {
  return (
    <section className="relative isolate">
      <BluredCircle radius={250} top="60%" left="70%" bg="bg-sage1A" blur="200px" />
      <BluredCircle radius={200} top="60%" left="25%" bg="bg-cyan2" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="max-w-page mx-auto b-base5">
          <h2 className="H1" id="contact">
            Contact Me
          </h2>
          <Space size="h-4" />
          <p className="c-base11">Let&apos;s get in touch</p>
          <p className="c-gray11">Feel free to contact me. I try to reach back to you soon.</p>
          <div className="h-6"></div>
          <ul className="grid xs:flex  gap-4 ">
            <li>
              <GlassLinkButton accent href="mailto:hamidpm@proton.me">
                <Icon name="bf-i-ph-envelope-simple" className="-mb-0.2em" />
                Email Me
              </GlassLinkButton>
            </li>
            <li>
              <GlassLinkButton target="_blank" href="https://github.com/awwwdev">
                <Icon name="bf-i-bxl-github" className="fs-lg -mb-0.2em" />
                My GitHub
              </GlassLinkButton>
            </li>
            <li>
              <GlassLinkButton target="_blank" href="https://www.linkedin.com/in/hamidddev/">
                <Icon name="bf-i-bxl-linkedin-square" className="fs-lg -mb-0.2em " />
                My Linkedin
              </GlassLinkButton>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function GlassLinkButton({
  href,
  target,
  children,
  accent = false,
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <LinkButton
      {...{ target, href }}
      variation="outline"
      preStyled={false}
      className={`b-1 fw-500 cursor-pointer appearance-none underline-none text-center whitespace-nowrap leading-1em
      focus-visible:outline-accent11
      focus:outline-accent9
      focus:outline-offset-3
      focus:outline-1.5 
      items-center gap-3 lt-xs:!grid  xs:min-w-40 h-2.75em px-1em rd-0.5em block flex items-center justify-center
      !b-transparent relative !b-0 !rd-2 !bg-transparent  from-transparent bg-gradient-to-br ${
        accent ? "to-accent3A hover:to-accent4A" : "to-base3A hover:to-base4A"
      }
      transition ease duration-150ms relative group`}
      style={{ gridTemplateColumns: "1em 1fr 1em" }}
    >
      <GradientBorderOverlay
        direction="to bottom right"
        from={accent ? "from-accent5A group:hover:from-accent6A" : "from-base5"}
        // via={accent ? "from-accent5A" : "from-base5A"}
        // to={accent ? "from-accent5A" : "from-base5A"}
      />
      {children}
    </LinkButton>
  );
}
