"use client";

import { useRef } from "react";
import { Application, extend } from "@pixi/react";
import PixiCanvas from "@/components/PixiCanvas";

export default function Home() {
  const parentRef = useRef<HTMLElement>(null);

  return (
    <main ref={parentRef} className="h-dvh w-screen">
      <Application resizeTo={parentRef} background="#121212" autoStart>
        <PixiCanvas />
      </Application>
    </main>
  );
}
