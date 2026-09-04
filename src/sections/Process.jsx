import "./Process.css";

const processSteps = [
  {
    number: "01",
    icon: "💧",
    title: "Raw Water",
    
  },
  {
    number: "02",
    icon: "🔄",
    title: "Filtration",
   
  },
  {
    number: "03",
    icon: "💦",
    title: "RO Purification",
   
  },
  {
    number: "04",
    icon: "✓",
    title: "Quality Check",
    
  },
  {
    number: "05",
    icon: "🫙",
    title: "Packaging",
    
  },
];

function Process() {
  return (
    <section className="process-section" id="process">
      <div className="process-container">
        <div className="process-heading">
          <p className="section-eyebrow">OUR PROCESS</p>

          <h2>
            From purification
            <span> to your doorstep.</span>
          </h2>

          <p>
            We follow a systematic water treatment and preparation process
            before supplying drinking water to homes, shops, businesses and
            events.
          </p>
        </div>

        <div className="process-steps">
          {processSteps.map((step, index) => (
            <div className="process-step" key={step.number}>
              <div className="process-step-number">{step.number}</div>

              <div className="process-icon">{step.icon}</div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              {index < processSteps.length - 1 && (
                <div className="process-arrow">→</div>
              )}
            </div>
          ))}
        </div>

        <div className="process-note">
          <span>💧</span>
          <p>
            Our aim is to provide convenient access to RO purified drinking
            water for the local Rajapakar community.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Process;