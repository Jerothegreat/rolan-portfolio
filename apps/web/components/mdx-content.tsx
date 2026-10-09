import * as runtime from "react/jsx-runtime";
import type { ReactNode } from "react";

// Velite compiles each MDX body to a function body; this runs it on the server at build.
// The code comes only from our own content files. Compiled MDX uses no hooks, so its
// default export is called as a plain function rather than mounted as a component.
export function MdxContent({ code }: { code: string }) {
  const render = new Function(code)({ ...runtime }).default as (props: object) => ReactNode;
  return render({});
}
