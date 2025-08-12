/**
 * Analysis form component for text input and submission
 */

import React, { useState } from "react";
import { Button, TextArea, Alert } from "@/components/ui";
import { EXAMPLE_TEXTS } from "@/lib/constants/fallacies";

interface AnalysisFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(text);
  };

  const handleExampleText = (exampleText: string) => {
    setText(exampleText);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <TextArea
          label="Masukkan teks untuk dianalisis:"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan teks yang ingin dianalisis untuk kesalahan logika..."
          rows={6}
          error={error}
        />

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Contoh teks:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_TEXTS.map((contoh, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => handleExampleText(contoh)}
                variant="outline"
              >
                Contoh {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        <Button type="submit" size="lg" disabled={isLoading} className="w-full" variant="outline">
          {isLoading ? "Menganalisis..." : "Analisis Teks"}
        </Button>
      </form>
    </div>
  );
};
