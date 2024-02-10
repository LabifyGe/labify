"use client";

import { useRef, useState } from "react";
import { addExampleModel } from "@/actions/addExampleModel";

type Model = {
  title: string;
};

export default function Thread({ models: _models }: { models: Model[] }) {
  const [models, setModels] = useState(_models);
  const ref = useRef<HTMLFormElement | null>(null);
  return (
    <div>
      {models.map((m, k) => (
        <div key={k}>{m.title}</div>
      ))}
      <form
        ref={ref}
        action={async (formData: FormData) => {
          const model = formData.get("model")?.toString();
          if (!model) return;
          setModels((prev) => [...prev, { title: model }]);
          await addExampleModel(model);
          ref.current?.reset();
        }}
      >
        <input type="text" name="model" />
        <button type="submit">Add Model</button>
      </form>
    </div>
  );
}
