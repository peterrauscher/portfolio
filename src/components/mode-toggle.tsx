"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn("relative", className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="absolute h-[70%] w-[70%] scale-0 rotate-90 opacity-0 transition-all duration-200 ease-out dark:scale-100 dark:rotate-0 dark:opacity-100" />
      <MoonIcon className="absolute h-[70%] w-[70%] scale-100 rotate-0 opacity-100 transition-all duration-200 ease-out dark:scale-0 dark:-rotate-90 dark:opacity-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
