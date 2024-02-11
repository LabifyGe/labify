"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";

import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export function BackgroundAnimation() {
  const [init, setInit] = useState(false);
  const { theme, systemTheme } = useTheme();
  console.log(theme);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: Container | undefined) => {
    // console.log(container);
  };

  if (!init) {
    return null;
  }
  return (
    <div className="fixed w-full h-screen top-0 left-0 -z-20 ">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          fpsLimit: 80,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
              },
            },
            color: {
              value:
                theme === "dark" ||
                (theme === "system" && systemTheme === "dark")
                  ? ["#ffffff"]
                  : ["#000000"],
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
            },
            size: {
              value: { min: 1, max: 3 },
            },
            move: {
              enable: true,
              speed: 0.5,
              random: true,
            },
          },
          interactivity: {
            detectsOn: "window",
            events: {},
          },
          background: {
            // image: "radial-gradient(#4a0000, #000)",
          },
        }}
      />
    </div>
  );
}
