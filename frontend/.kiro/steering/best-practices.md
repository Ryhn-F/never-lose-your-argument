# Best Practices, Clean Code & Clean Architecture

## Code Quality Standards

### Clean Code Principles
- **Meaningful Names**: Use descriptive, searchable names for variables, functions, and classes
- **Functions**: Keep functions small (max 20 lines), do one thing well, use descriptive names
- **Comments**: Write self-documenting code, use comments only when necessary to explain "why" not "what"
- **Formatting**: Consistent indentation, spacing, and line breaks
- **Error Handling**: Use proper error handling, avoid silent failures
- **DRY Principle**: Don't Repeat Yourself - extract common functionality
- **SOLID Principles**: Follow Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

### Clean Architecture Guidelines
- **Separation of Concerns**: Clear boundaries between layers
- **Dependency Rule**: Dependencies point inward, outer layers depend on inner layers
- **Layer Structure**:
  - **Entities**: Core business logic and rules
  - **Use Cases**: Application-specific business rules
  - **Interface Adapters**: Controllers, presenters, gateways
  - **Frameworks & Drivers**: External frameworks, databases, UI

### TypeScript/JavaScript Best Practices
- Use TypeScript for type safety
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks and short functions
- Implement proper error boundaries and error handling
- Use async/await over promises when possible
- Implement proper validation for inputs
- Use meaningful variable and function names in English

### React/Next.js Specific
- **Component Structure**: One component per file, use functional components
- **Hooks**: Use custom hooks for reusable logic
- **State Management**: Keep state as close to where it's used as possible
- **Performance**: Use React.memo, useMemo, useCallback when appropriate
- **Accessibility**: Include proper ARIA labels and semantic HTML
- **File Organization**: Group related files, use index files for clean imports

### File and Folder Organization
```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   └── common/         # Common business components
├── features/           # Feature-based modules
│   └── [feature]/
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── services/   # Feature-specific services
│       └── types/      # Feature-specific types
├── hooks/              # Global custom hooks
├── lib/                # Utilities and configurations
│   ├── utils/          # Helper functions
│   ├── constants/      # Application constants
│   └── types/          # Global type definitions
└── services/           # External API services
```

### Code Implementation Rules
1. **Always use TypeScript**: Provide proper type definitions
2. **Error Handling**: Implement try-catch blocks and proper error messages
3. **Validation**: Validate all inputs and external data
4. **Security**: Sanitize inputs, use environment variables for secrets
5. **Performance**: Optimize for performance, avoid unnecessary re-renders
7. **Documentation**: Include JSDoc comments for complex functions
8. **Consistency**: Follow established patterns in the codebase

### Code Review Checklist
- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] Proper error handling implemented
- [ ] Types are properly defined
- [ ] No code duplication
- [ ] Performance considerations addressed
- [ ] Security best practices followed
- [ ] Code is readable and maintainable

## Implementation Guidelines
When generating or modifying code, always:
1. Apply these principles from the start
2. Refactor existing code to meet these standards
3. Provide explanations for architectural decisions
4. Suggest improvements for better code quality
5. Ensure code is production-ready and maintainable

## NOT TO DO
1. Create unit test