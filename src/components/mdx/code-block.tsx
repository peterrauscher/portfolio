"use client";

import {
  Children,
  type ComponentProps,
  isValidElement,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre"> & {
  "data-language"?: string;
  "data-theme"?: string;
  "data-title"?: string;
};
type CodeFigureProps = ComponentProps<"figure"> & {
  "data-rehype-pretty-code-figure"?: string;
};
type TitleProps = ComponentProps<"figcaption"> & {
  "data-rehype-pretty-code-title"?: string;
};
const COPY_RESET_MS = 2000;

function isShikiPre(props: CodeBlockProps) {
  return Boolean(props["data-language"]) || Boolean(props["data-theme"]);
}

function hasTitleNode(child: ReactNode): child is ReactElement<TitleProps> {
  if (!isValidElement(child)) return false;
  if (child.props == null) return false;
  if (typeof child.props !== "object") return false;
  return "data-rehype-pretty-code-title" in child.props;
}

async function copyCodeFromElement(
  element: HTMLElement | null,
  setCopied: (copied: boolean) => void,
) {
  if (!element) return;

  const code = element.textContent ?? "";
  try {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_RESET_MS);
  } catch (error) {
    console.error("Failed to copy code:", error);
  }
}

export function CodeFigure({ children, ...props }: CodeFigureProps) {
  const [copied, setCopied] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  if (props["data-rehype-pretty-code-figure"] === undefined) {
    return (
      <figure {...props} ref={figureRef}>
        {children}
      </figure>
    );
  }

  const childNodes = Children.toArray(children);
  const titleNode = childNodes.find(hasTitleNode);
  const title = titleNode?.props.children ?? null;
  const content = titleNode
    ? childNodes.filter((child) => child !== titleNode)
    : childNodes;

  const handleCopy = async () => {
    const pre = figureRef.current?.querySelector(
      "pre",
    ) as HTMLPreElement | null;
    await copyCodeFromElement(pre, setCopied);
  };

  return (
    <figure
      ref={figureRef}
      {...props}
      className={cn(
        "group border-border relative overflow-hidden rounded-xl border",
        props.className,
      )}
    >
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon"
        className={cn(
          "text-primary border-border absolute right-3 size-8 cursor-pointer rounded-md border opacity-100 shadow-none transition-opacity lg:opacity-0 lg:group-hover:opacity-100",
          title ? "top-13" : "top-3",
        )}
        aria-label="Copy code"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
      {title && (
        <div className="border-border bg-muted/50 text-foreground rounded-t-xl border-b p-3 text-xs font-medium">
          {title}
        </div>
      )}
      <div className="p-3">{content}</div>
    </figure>
  );
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const title = props["data-title"] as string | undefined;

  if (isShikiPre(props)) {
    return (
      <pre
        ref={preRef}
        {...props}
        className={cn("m-0! overflow-x-auto p-0!", props.className)}
      >
        {children}
      </pre>
    );
  }

  const handleCopy = async () => {
    await copyCodeFromElement(preRef.current, setCopied);
  };

  return (
    <div className="group border-border relative overflow-hidden rounded-xl border">
      {title && (
        <div className="border-border bg-muted/50 text-foreground rounded-t-xl border-b p-3 text-xs font-medium">
          {title}
        </div>
      )}
      <pre
        ref={preRef}
        {...props}
        className={cn("m-0! overflow-x-auto p-0!", props.className)}
      >
        {children}
      </pre>
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon"
        className={cn(
          "text-primary border-border absolute right-3 size-8 cursor-pointer rounded-md border opacity-100 shadow-none transition-opacity lg:opacity-0 lg:group-hover:opacity-100",
          title ? "top-13" : "top-3",
        )}
        aria-label="Copy code"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
