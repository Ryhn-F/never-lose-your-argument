"use client";

import React from 'react';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white tracking-tight">
              dialectica
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
              never lose an argument again
            </p>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              Master the art of logical reasoning. Identify fallacies, strengthen your arguments, 
              and engage in more meaningful discussions with AI-powered analysis.
            </p>
          </div>

          {/* CTA Section */}
          <div className="pt-8">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="bg-[#6c47ff] hover:bg-[#5a3dd9] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <button 
                onClick={() => window.location.href = '/app'}
                className="bg-[#6c47ff] hover:bg-[#5a3dd9] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </button>
            </SignedIn>
          </div>

          {/* Features Preview */}
          <div className="pt-16 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-[#6c47ff] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Detect Fallacies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instantly identify logical fallacies in any text or argument
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-[#6c47ff] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">AI-Powered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced AI analysis for accurate and detailed feedback
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-[#6c47ff] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Learn & Improve</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Understand reasoning patterns and improve your arguments
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
