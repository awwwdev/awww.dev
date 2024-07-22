import LinkButton from "@/components/ui/button/LinkButton";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from '../ui/Space';

export default function ContactMe() {
  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue3" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="max-w-page mx-auto b-base5">
          <h2 className="H1" id="contact">
            Contact
          </h2>
          <Space size="h-4" />
          <p className="c-sand11">Let&apos;s get in touch</p>
          <p className="c-gray11">Feel free to contact me. I try to reach back to you soon.</p>
          <div className="h-6"></div>
          <ul className="grid xs:flex  gap-4 ">
            <li>
              <LinkButton
                variation="ghost-accent"
                href="mailto:hamidpm@proton.me"
                className="items-center gap-3  lt-xs:!grid"
                style={{ gridTemplateColumns: "1em 1fr 1em" }}
              >
                <Icon name="bf-i-ph-envelope-simple" className="-mb-0.2em" />
                Email Me
              </LinkButton>
            </li>
            <li>
              <LinkButton
                variation="ghost"
                href="https://github.com/vashmeen"
                className="items-center gap-3  lt-xs:!grid"
                style={{ gridTemplateColumns: "1em 1fr 1em" }}
              >
                <Icon name="bf-i-bxl-github" className="fs-lg -mb-0.2em" />
                My GitHub
              </LinkButton>
            </li>
            <li>
              <LinkButton
                variation="ghost"
                href="https://www.linkedin.com/in/hamidddev/"
                className="items-center gap-3  lt-xs:!grid"
                style={{ gridTemplateColumns: "1em 1fr 1em" }}
              >
                <Icon name="bf-i-bxl-linkedin-square" className="fs-lg -mb-0.2em " />
                My Linkedin
              </LinkButton>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
