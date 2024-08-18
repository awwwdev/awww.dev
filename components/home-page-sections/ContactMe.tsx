import LinkButton from "@/components/ui/button/LinkButton";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from '../ui/Space';

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
          <p className="c-sand11">Let&apos;s get in touch</p>
          <p className="c-gray11">Feel free to contact me. I try to reach back to you soon.</p>
          <div className="h-6"></div>
          <ul className="grid xs:flex  gap-4 ">
            <li>
              <LinkButton
                variation="outline-accent"
                href="mailto:hamidpm@proton.me"
                className="items-center gap-3  lt-xs:!grid xs:min-w-40"
                style={{ gridTemplateColumns: "1em 1fr 1em" }}
              >
                <Icon name="bf-i-ph-envelope-simple" className="-mb-0.2em" />
                Email Me
              </LinkButton>
            </li>
            <li>
              <LinkButton
              target='_blank'

                variation="outline"
                href="https://github.com/awwwdev"
                className="items-center gap-3  lt-xs:!grid  xs:min-w-40"
                style={{ gridTemplateColumns: "1em 1fr 1em" }}
              >
                <Icon name="bf-i-bxl-github" className="fs-lg -mb-0.2em" />
                My GitHub
              </LinkButton>
            </li>
            <li>
              <LinkButton
              target='_blank'
                variation="outline"
                href="https://www.linkedin.com/in/hamidddev/"
                className="items-center gap-3  lt-xs:!grid  xs:min-w-40"
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



