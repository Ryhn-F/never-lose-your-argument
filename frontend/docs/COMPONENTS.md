# Component Documentation

## Overview

Dokumentasi ini menjelaskan semua komponen yang digunakan dalam aplikasi Fallacy Checker, terorganisir berdasarkan kategori dan tingkat abstraksi.

## Component Hierarchy

```
App
├── Layout Components
│   ├── Navigation
│   ├── Header
│   └── Footer
├── Feature Components
│   ├── Analysis Feature
│   │   ├── AnalysisForm
│   │   ├── AnalysisResults
│   │   └── FallacyItem
│   └── Fallacy Info Feature
│       └── FallacyDescription
└── UI Components
    ├── Button
    ├── TextArea
    ├── ProgressBar
    └── Alert
```

## UI Components

### Button

**Location**: `src/components/ui/Button.tsx`

**Purpose**: Reusable button component dengan berbagai variant dan state

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}
```

**Usage**:
```tsx
<Button 
  variant="primary" 
  size="lg" 
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Analisis Teks
</Button>
```

**Features**:
- Multiple variants (primary, secondary, outline)
- Different sizes (sm, md, lg)
- Loading state dengan spinner
- Disabled state support
- Full accessibility support

---

### TextArea

**Location**: `src/components/ui/TextArea.tsx`

**Purpose**: Reusable textarea component dengan label dan error handling

**Props**:
```typescript
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
```

**Usage**:
```tsx
<TextArea
  label="Masukkan teks untuk dianalisis:"
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Masukkan teks..."
  error={validationError}
  rows={6}
/>
```

**Features**:
- Optional label dengan proper association
- Error state styling dan message
- Dark mode support
- Focus states dan transitions

---

### ProgressBar

**Location**: `src/components/ui/ProgressBar.tsx`

**Purpose**: Progress bar untuk menampilkan nilai numerik secara visual

**Props**:
```typescript
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'green' | 'red' | 'blue' | 'yellow';
  label?: string;
  showValue?: boolean;
}
```

**Usage**:
```tsx
<ProgressBar
  value={result.strong}
  max={10}
  color="green"
  label="Tingkat Kekuatan"
/>
```

**Features**:
- Customizable colors
- Optional label dan value display
- Smooth animations
- Responsive design

---

### Alert

**Location**: `src/components/ui/Alert.tsx`

**Purpose**: Alert component untuk menampilkan pesan dengan berbagai tipe

**Props**:
```typescript
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}
```

**Usage**:
```tsx
<Alert type="error">
  Terjadi kesalahan saat menganalisis teks
</Alert>

<Alert type="success">
  <p className="font-medium">
    Tidak ditemukan kesalahan logika dalam teks ini.
  </p>
</Alert>
```

**Features**:
- 4 different types dengan appropriate colors
- Icons untuk setiap type
- Dark mode support
- Flexible content support

## Layout Components

### Navigation

**Location**: `src/components/layout/Navigation.tsx`

**Purpose**: Main navigation bar untuk aplikasi

**Features**:
- Logo/brand link
- Navigation links
- Responsive design
- Dark mode support

**Usage**:
```tsx
// Digunakan di layout.tsx
<Navigation />
```

---

### Header

**Location**: `src/components/layout/Header.tsx`

**Purpose**: Page header dengan title dan description

**Props**:
```typescript
interface HeaderProps {
  title: string;
  description?: string;
}
```

**Usage**:
```tsx
<Header
  title="Penganalisis Kesalahan Logika"
  description="Identifikasi logical fallacies dalam teks dengan bantuan AI"
/>
```

---

### Footer

**Location**: `src/components/layout/Footer.tsx`

**Purpose**: Site footer dengan copyright dan links

**Features**:
- Copyright information
- Navigation links
- Responsive layout

## Feature Components

### Analysis Feature

#### AnalysisForm

**Location**: `src/features/analysis/components/AnalysisForm.tsx`

**Purpose**: Form untuk input teks dan trigger analysis

**Props**:
```typescript
interface AnalysisFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}
```

**Features**:
- Text input dengan validation
- Example text buttons
- Error display
- Loading state
- Form submission handling

**Usage**:
```tsx
<AnalysisForm
  onSubmit={analyzeText}
  isLoading={isLoading}
  error={error}
/>
```

---

#### AnalysisResults

**Location**: `src/features/analysis/components/AnalysisResults.tsx`

**Purpose**: Menampilkan hasil analisis teks

**Props**:
```typescript
interface AnalysisResultsProps {
  result: AnalysisResult;
}
```

**Features**:
- Metrics display (sentiment, language, strength, aggressiveness)
- Fallacy list dengan conditional rendering
- Progress bars untuk numerical values
- Responsive grid layout

**Usage**:
```tsx
{result && <AnalysisResults result={result} />}
```

---

#### FallacyItem

**Location**: `src/features/analysis/components/FallacyItem.tsx`

**Purpose**: Individual fallacy item dalam results list

**Props**:
```typescript
interface FallacyItemProps extends Fallacy {
  color: string;
}
```

**Features**:
- Color-coded border
- Fallacy type badge
- Text excerpt display
- Explanation text

**Usage**:
```tsx
<FallacyItem
  text={fallacy.text}
  type={fallacy.type}
  explanation={fallacy.explanation}
  color={getFallacyColor(index)}
/>
```

### Fallacy Info Feature

#### FallacyDescription

**Location**: `src/features/fallacy-info/components/FallacyDescription.tsx`

**Purpose**: Menampilkan informasi tentang jenis fallacy

**Props**:
```typescript
interface FallacyDescriptionProps extends FallacyType {
  name: string;
  description: string;
}
```

**Usage**:
```tsx
<FallacyDescription
  name="Ad Hominem"
  description="Menyerang karakter atau sifat pribadi lawan bicara..."
/>
```

## Component Patterns

### 1. Composition Pattern

Components dirancang untuk composable dan reusable:

```tsx
// Good: Composable
<Alert type="error">
  <p className="font-medium">Error occurred</p>
  <p className="text-sm">Please try again</p>
</Alert>

// Instead of: Monolithic
<ErrorAlert 
  title="Error occurred" 
  message="Please try again" 
  showIcon={true} 
/>
```

### 2. Props Interface Pattern

Semua components menggunakan TypeScript interfaces:

```typescript
// Extend HTML element props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

// Composition dengan domain types
interface AnalysisResultsProps {
  result: AnalysisResult; // Domain type
}
```

### 3. Barrel Export Pattern

Setiap folder component memiliki `index.ts` untuk clean imports:

```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { TextArea } from './TextArea';
export { ProgressBar } from './ProgressBar';
export { Alert } from './Alert';

// Usage
import { Button, Alert } from '@/components/ui';
```

### 4. Conditional Rendering Pattern

```tsx
// Error state
{error && (
  <Alert type="error">{error}</Alert>
)}

// Loading state
<Button isLoading={isLoading}>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>

// Conditional content
{result.contains_fallacies ? (
  <FallacyList fallacies={result.fallacies} />
) : (
  <Alert type="success">No fallacies found</Alert>
)}
```

## Styling Approach

### 1. Tailwind CSS Classes

Semua styling menggunakan Tailwind CSS utility classes:

```tsx
<div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
    Title
  </h2>
</div>
```

### 2. Dark Mode Support

Semua components mendukung dark mode:

```tsx
<div className="bg-gray-50 dark:bg-neutral-950">
  <p className="text-gray-700 dark:text-gray-300">Content</p>
</div>
```

### 3. Responsive Design

Mobile-first responsive design:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="p-4">Content</div>
</div>
```

## Accessibility

### 1. Semantic HTML

```tsx
<main className="min-h-screen">
  <header className="mb-8">
    <h1>Page Title</h1>
  </header>
  <section>
    <h2>Section Title</h2>
  </section>
</main>
```

### 2. ARIA Labels

```tsx
<button
  aria-label="Analyze text for logical fallacies"
  disabled={isLoading}
>
  {isLoading ? 'Analyzing...' : 'Analyze'}
</button>
```

### 3. Form Labels

```tsx
<label htmlFor="text-input" className="block text-sm font-medium mb-2">
  Enter text to analyze:
</label>
<textarea id="text-input" />
```

## Performance Optimizations

### 1. React.memo untuk Pure Components

```tsx
export const FallacyItem = React.memo<FallacyItemProps>(({
  text,
  type,
  explanation,
  color,
}) => {
  // Component implementation
});
```

### 2. useCallback untuk Event Handlers

```tsx
const handleSubmit = useCallback(async (text: string) => {
  // Handler implementation
}, []);
```

### 3. Lazy Loading

```tsx
const AnalysisResults = lazy(() => import('./AnalysisResults'));

// Usage dengan Suspense
<Suspense fallback={<div>Loading...</div>}>
  {result && <AnalysisResults result={result} />}
</Suspense>
```

## Testing Strategies

### 1. Component Testing

```tsx
describe('Button Component', () => {
  it('renders with correct variant classes', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

```tsx
describe('Analysis Flow', () => {
  it('completes analysis workflow', async () => {
    render(<HomePage />);
    
    const textarea = screen.getByLabelText(/enter text/i);
    const button = screen.getByRole('button', { name: /analyze/i });
    
    fireEvent.change(textarea, { target: { value: 'test text' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/analysis results/i)).toBeInTheDocument();
    });
  });
});
```

## Future Enhancements

### 1. Component Library

- Storybook integration untuk component documentation
- Design system tokens
- Component playground

### 2. Advanced Components

- Data table component untuk complex data
- Modal/Dialog components
- Toast notification system
- Infinite scroll components

### 3. Performance

- Virtual scrolling untuk large lists
- Image optimization components
- Code splitting per feature

### 4. Accessibility

- Screen reader testing
- Keyboard navigation improvements
- High contrast mode support