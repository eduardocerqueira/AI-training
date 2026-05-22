"use client";

import "@assistant-ui/react-markdown/styles/dot.css";
import {
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
} from "@assistant-ui/react-markdown";
import { memo } from "react";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

const defaultComponents = memoizeMarkdownComponents({
  p: ({ className, ...props }) => (
    <p
      className={cn("mb-2 leading-relaxed last:mb-0", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("text-primary underline underline-offset-2", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded border border-border/50 bg-muted/50 px-1 py-0.5 font-mono text-[0.85em]",
        className,
      )}
      {...props}
    />
  ),
});

const MarkdownTextImpl = () => (
  <MarkdownTextPrimitive
    remarkPlugins={[remarkGfm]}
    className="aui-md"
    components={defaultComponents}
  />
);

export const MarkdownText = memo(MarkdownTextImpl);
