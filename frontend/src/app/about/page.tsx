/**
 * About page component
 */

import React from 'react';
import { Header } from '@/components/layout';
import { FallacyDescription } from '@/features/fallacy-info/components';
import { FALLACY_TYPES } from '@/lib/constants/fallacies';

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Tentang Fallacy Checker"
          description="Pelajari lebih lanjut tentang logical fallacies dan cara kerja aplikasi ini"
        />

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Apa itu Logical Fallacy?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Logical fallacy atau kesalahan logika adalah argumen yang tampak masuk akal 
            tetapi sebenarnya mengandung cacat dalam penalaran. Aplikasi ini menggunakan 
            AI untuk mengidentifikasi berbagai jenis kesalahan logika dalam teks yang Anda masukkan.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Dengan memahami dan mengenali kesalahan logika, kita dapat berpikir lebih kritis 
            dan membuat argumen yang lebih kuat dalam diskusi dan debat.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
            Jenis-jenis Logical Fallacy
          </h2>
          <div className="space-y-6">
            {FALLACY_TYPES.map((fallacy, index) => (
              <FallacyDescription
                key={index}
                name={fallacy.name}
                description={fallacy.description}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}