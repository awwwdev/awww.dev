import Space from '../ui/Space';
import BluredCircle from "./BluredCircle";

export default function AboutMe() {

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber3" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue3" blur="200px" />

      <div className="mx-auto max-w-page  ">
          <h2 className="H1" id='about'>About Me</h2>
        <Space size="h-4" />
        <div className="space-y-4 c-gray11">
          <p>
            I help businesses to discover their visual language, create wireframes, make high fidelity UI prototypes and
            develop it into production.
          </p>

          <p>During past 7 years, I have worked with many teams as a Designer, Developer or both.</p>

          <p>
            My experinces are most beneficial to competitons who want to stand apart from the competition, by delivering
            astonishing User Interfaces, but don't want to comprimise performance, accessiblity and development speed.
          </p>
          <p>
            Besides work, I spend my time with illustrating, Photography and Music. I'd love to explore areas that
            combine Art and Web Technologies together!
          </p>
        </div>
      </div>
    </section>
  );
}
