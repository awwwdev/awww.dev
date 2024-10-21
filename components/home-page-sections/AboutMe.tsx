import Space from "../ui/Space";
import BluredCircle from "./BluredCircle";

export default function AboutMe() {
  return (
    <section className="relative">
      <BluredCircle radius={150} top="85%" left="60%" bg="bg-gold2A" blur="200px" />
      <div className="mx-auto max-w-page  ">
        <h2 className="H1" id="about">
          About Me
        </h2>
        <Space size="h-4" />
        <div className="space-y-4 c-gray11">
          <p>I help businesses create user experiences that give them a competitive edge.</p>
          <p>Over the past few years, I&apos;ve worked with various teams as both a Developer and Designer.</p>
          <p>
            As a developer, I build everything from complex web applications to landing pages with bold designs,
            ensuring top performance and accessibility. While I specialize in front-end development, I also design data
            structures, set up REST APIs, and create backend applications using modern web technologies like tRPC,
            PostgreSQL, and Node.js.
          </p>
          <p>
            As a designer, I collaborate with teams to define their visual identity, create wireframes, and develop
            high-fidelity UI prototypes ready for development.
          </p>
          <p>
            Outside of work, I enjoy drawing, photography, and playing music. I&apos;m always excited to explore new ways to combine art and web technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
