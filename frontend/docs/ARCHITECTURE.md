# Arsitektur Aplikasi Fallacy Checker

## Overview

Aplikasi Fallacy Checker dibangun menggunakan prinsip **Clean Architecture** dengan **separation of concerns** yang jelas. Arsitektur ini memungkinkan kode yang mudah di-maintain, testable, dan scalable.

## Prinsip Clean Architecture

### 1. Dependency Rule
- Dependencies hanya mengarah ke dalam (inward)
- Layer luar bergantung pada layer dalam, bukan sebaliknya
- Core business logic tidak bergantung pada framework atau UI

### 2. Layer Structure

```
┌─────────────────────────────────────────┐
│           Frameworks & Drivers          │
│         (Next.js, Tailwind CSS)         │
├─────────────────────────────────────────┤
│          Interface Adapters             │
│        (Components, Controllers)        │
├─────────────────────────────────────────┤
│             Use Cases                   │
│        (Hooks, Services)                │
├─────────────────────────────────────────┤
│              Entities                   │
│         (Types, Constants)              │
└─────────────────────────────────────────┘
```

## Layer Details

### 1. Entities (Core Domain)
**Location**: `src/lib/types/`, `src/lib/constants/`

**Responsibility**: 
- Mendefinisikan business entities dan rules
- Type definitions untuk domain objects
- Constants yang digunakan di seluruh aplikasi

**Files**:
- `analysis.ts` - Core analysis types
- `fallacies.ts` - Fallacy constants dan types

**Contoh**:
```typescript
export interface AnalysisResult {
  sentiment: string;
  language: string;
  strong: number;
  aggressiveness: number;
  contains_fallacies: boolean;
  fallacies: Fallacy[];
}
```

### 2. Use Cases (Application Business Rules)
**Location**: `src/hooks/`, `src/services/`

**Responsibility**:
- Orchestrate data flow antara entities dan interface adapters
- Implement application-specific business rules
- Handle external API communication

**Files**:
- `useAnalysis.ts` - Analysis state management
- `analysis.service.ts` - API communication service

**Contoh**:
```typescript
export const useAnalysis = (): UseAnalysisState & UseAnalysisActions => {
  // Business logic untuk analysis workflow
  const analyzeText = useCallback(async (text: string) => {
    // Validation, API call, state management
  }, []);
};
```

### 3. Interface Adapters (Controllers, Presenters, Gateways)
**Location**: `src/components/`, `src/features/`

**Responsibility**:
- Convert data antara use cases dan external agencies
- Handle user input dan present data
- Implement UI logic

**Structure**:
```
src/components/
├── ui/                 # Basic reusable components
├── layout/             # Layout-specific components
src/features/
├── analysis/           # Analysis feature components
├── fallacy-info/       # Fallacy information components
```

**Contoh**:
```typescript
export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  // UI logic dan event handling
};
```

### 4. Frameworks & Drivers (External Interfaces)
**Location**: `src/app/`, `src/lib/utils/`

**Responsibility**:
- Framework-specific implementations
- External tool configurations
- Utility functions

**Files**:
- Next.js pages dan layouts
- Utility functions
- Configuration files

## Data Flow

```
User Input → UI Components → Custom Hooks → Services → API
                ↓              ↓           ↓        ↓
            State Update ← Business Logic ← Response ← Backend
```

### 1. Input Flow
1. User memasukkan teks di `AnalysisForm`
2. Form memanggil `onSubmit` callback
3. `useAnalysis` hook menerima input
4. Hook memanggil `analysisService.analyzeText()`
5. Service melakukan validasi dan API call

### 2. Output Flow
1. API response diterima oleh service
2. Service mengembalikan formatted response
3. Hook mengupdate state dengan hasil
4. UI components re-render dengan data baru
5. `AnalysisResults` menampilkan hasil analisis

## Component Architecture

### Feature-Based Organization
```
src/features/analysis/
├── components/
│   ├── AnalysisForm.tsx      # Form input component
│   ├── AnalysisResults.tsx   # Results display component
│   ├── FallacyItem.tsx       # Individual fallacy item
│   └── index.ts              # Barrel export
├── hooks/                    # Feature-specific hooks (if any)
├── services/                 # Feature-specific services (if any)
└── types/                    # Feature-specific types (if any)
```

### UI Component Hierarchy
```
App Layout
├── Navigation
├── Page Content
│   ├── Header
│   ├── AnalysisForm
│   │   ├── TextArea
│   │   ├── Button
│   │   └── Alert (error)
│   └── AnalysisResults
│       ├── ProgressBar
│       ├── Alert (success/warning)
│       └── FallacyItem[]
└── Footer
```

## State Management

### Local State Pattern
- Menggunakan `useState` untuk component-level state
- Custom hooks untuk business logic state
- No global state management (Redux/Zustand) - keeping it simple

### State Flow
```typescript
// Component State
const [text, setText] = useState('');

// Business Logic State (Custom Hook)
const { result, isLoading, error, analyzeText } = useAnalysis();

// Service State (Internal)
class AnalysisService {
  private readonly baseUrl: string;
  // Service configuration
}
```

## Error Handling Strategy

### 1. Validation Layer
```typescript
export const validateAnalysisText = (text: string): void => {
  if (!text || typeof text !== 'string') {
    throw new ValidationError('Teks tidak boleh kosong');
  }
  // Additional validations
};
```

### 2. Service Layer
```typescript
async analyzeText(text: string): Promise<ApiResponse<AnalysisResult>> {
  try {
    validateAnalysisText(text);
    // API call
  } catch (error) {
    return { error: error.message, status: 400 };
  }
}
```

### 3. UI Layer
```typescript
{error && (
  <Alert type="error">{error}</Alert>
)}
```

## Scalability Considerations

### 1. Adding New Features
- Create new feature module in `src/features/`
- Define types in `src/lib/types/`
- Create service if external API needed
- Create custom hook for state management
- Build UI components in feature module

### 2. Adding New UI Components
- Create in `src/components/ui/` for reusable components
- Create in feature module for feature-specific components
- Follow consistent prop interface patterns
- Export through barrel files

### 3. Adding New Services
- Create in `src/services/`
- Follow consistent error handling pattern
- Use dependency injection where appropriate
- Create corresponding types in `src/lib/types/`

## Testing Strategy

### 1. Unit Tests
- Test utility functions in isolation
- Test custom hooks with React Testing Library
- Test service methods with mocked dependencies

### 2. Integration Tests
- Test component integration with hooks
- Test API service integration
- Test complete user workflows

### 3. E2E Tests
- Test critical user paths
- Test error scenarios
- Test responsive behavior

## Performance Considerations

### 1. Code Splitting
- Feature-based code splitting dengan dynamic imports
- Lazy loading untuk non-critical components

### 2. Memoization
- `useCallback` untuk event handlers
- `useMemo` untuk expensive calculations
- `React.memo` untuk component optimization

### 3. Bundle Optimization
- Tree shaking dengan proper exports
- Minimize external dependencies
- Optimize images dan assets

## Security Considerations

### 1. Input Validation
- Client-side validation untuk UX
- Server-side validation untuk security
- Sanitization untuk user inputs

### 2. API Security
- Environment variables untuk sensitive data
- HTTPS untuk production
- Proper error messages (no sensitive info leak)

### 3. XSS Prevention
- React's built-in XSS protection
- Proper HTML escaping
- Content Security Policy headers