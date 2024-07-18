import LinkButton from "@/components/ui/button/LinkButton";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";

export default function ContactMe() {
  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue3" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="max-w-page mx-auto b-base5  b-t-1 pt-12">
          <h2 className="H1">Contact</h2>

          <div className="h-12"></div>
          <p className="c-sand11">Let&apos;s get in touch</p>
          <p className="c-gray11">Feel free to contact me. I try to reach back to you soon.</p>
          <div className="h-6"></div>
          <ul className="flex flex-wrap gap-4 ac">
            <li>
              <LinkButton
                variation="ghost-accent"
                href="mailto:hamidpm@proton.me"
              >
                <Icon name="bf-i-ph-email-simple" />
                Email Me
              </LinkButton>
            </li>
            <li>
              <LinkButton variation="ghost" href="https://github.com/vashmeen">
                <Icon name="bf-i-logos-github-icon" />
                My GitHub
              </LinkButton>
            </li>
            <li>
              <LinkButton variation="ghost" href="https://www.linkedin.com/in/hamidddev/">
                <Icon name="bf-i-logos-linkedin-icon" />
                My Linkedin
              </LinkButton>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
