/**
 * Input validation utilities
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateAnalysisText = (text: string): void => {
  if (!text || typeof text !== 'string') {
    throw new ValidationError('Teks tidak boleh kosong');
  }

  if (text.trim().length === 0) {
    throw new ValidationError('Silakan masukkan teks untuk dianalisis');
  }

  if (text.length > 5000) {
    throw new ValidationError('Teks terlalu panjang (maksimal 5000 karakter)');
  }
};

export const sanitizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};