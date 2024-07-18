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
          <h2 className="H1" id='contact'>Contact</h2>

          <div className="h-12"></div>
          <p className="c-sand11">Let&apos;s get in touch</p>
          <p className="c-gray11">Feel free to contact me. I try to reach back to you soon.</p>
          <div className="h-6"></div>
          <ul className="flex flex-wrap gap-4 ac">
            <li>
              <LinkButton
                variation="ghost-accent"
                href="mailto:hamidpm@proton.me"
                className='items-center gap-2'
              >
                <Icon name="bf-i-ph-envelope-simple" className='-mb-0.1em' />
                Email Me
              </LinkButton>
            </li>
            <li>
              <LinkButton variation="ghost" href="https://github.com/vashmeen"
                className='items-center gap-2'
              
              >
                <Icon name="bf-i-logos-github-icon" className='filter-invert -mb-0.1em'/>
                My GitHub
              </LinkButton>
            </li>
            <li>
              <LinkButton variation="ghost" href="https://www.linkedin.com/in/hamidddev/"
                className='items-center gap-2'
              
              >
                <Icon name="bf-i-logos-linkedin-icon" className='-mb-0.1em '  />
                My Linkedin
              </LinkButton>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
