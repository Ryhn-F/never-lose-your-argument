"use client";

import { Button } from "@/components/ui";
import { Bot } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex-1 space-y-4">
      {/* Hero Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Dialectica
            </h1>
            <p className="text-lg text-muted-foreground">
              Master the art of logical reasoning and never lose an argument
              again.
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline">
              <Link href="/app/analysis">Start Analyzing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
