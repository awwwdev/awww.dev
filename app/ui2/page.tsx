import Space from "@/components/ui/Space";
import { useId } from "react";
import GradientMask, { gradientMask } from "@/components/ui/GradientMask";
import BluredCircle from "@/components/home-page-sections/BluredCircle";
import GlassCard from "@/components/ui/GlassCard";

// border color or gradient
// noise
// bg-gradient or color
//  shadow or glow

export default function Page() {
  return (
    <div className="max-w-page mx-auto">
      <Section title="The Div">
        <div className="space-y-12">
          <div className="h-80 b-base4 b-1 rd-6 p-6 bg-base3 bf-shadow-layer before:bg-blue8A before:blur-50 before:m-6 before:mt-10 before:opacity-80">
            fldfs;df ;df ;djf
          </div>

          <div className="h-80 b-base4 b-1 rd-6 p-6 bg-base3 bf-glow-layer before:bg-blue8A before:blur-150 before:m-6 before:mt-10 before:opacity-50">
            fldfs;df ;df ;djf
          </div>

          <GlassCard
            className="rd-6  p-6 backdrop-blur-20px bg-gradient-to-br from-gray3A to-gray1A"
            noiseLayer={{
              className: "opacity-10 ",
            }}
            borderGradient="b-2 bg-gradient-to-br from-gray5  to-gray1"
          >
            <h2 className="H2">Title</h2>
            <div className="h"></div>
            <p className="c-base11">Subtitle</p>
            <p className="c-base11">description</p>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}

function Triangle({ className }) {
  return <div className={`triangle ${className}`}></div>;
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

      <Space size="h-8" />
      <div className="b-t-2 b-sand5"></div>
    </section>
  );
}
