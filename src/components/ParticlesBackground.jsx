import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

async function particlesInit(engine) {
  await loadSlim(engine);
}

function ParticlesBackground() {
  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: {
            enable: true,
            zIndex: 0,
          },
          background: {
            color: "#141b29",
          },
          particles: {
            number: {
              value: 150,
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.7,
            },
            size: {
              value: {
                min: 2,
                max: 5,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#df040464",
              opacity: 0.25,
              width: 2,
            },
            move: {
              enable: true,
              speed: 0.3,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              grab: {
                distance: 239,
                links: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
        }}
      />
    </ParticlesProvider>
  );
}

export default ParticlesBackground;
