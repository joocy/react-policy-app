import { createContext, useContext, type ReactNode } from 'react';
import type { BasePolicy } from './types';

type PolicySelectionContextValue = {
  onPolicySelect: (policy: BasePolicy) => void;
};

const PolicySelectionContext = createContext<PolicySelectionContextValue | undefined>(undefined);

export function PolicySelectionProvider({
  children,
  onPolicySelect,
}: {
  children: ReactNode;
  onPolicySelect: (policy: BasePolicy) => void;
}) {
  return (
    <PolicySelectionContext.Provider value={{ onPolicySelect }}>
      {children}
    </PolicySelectionContext.Provider>
  );
}

export function usePolicySelection() {
  const context = useContext(PolicySelectionContext);
  if (!context) {
    throw new Error('usePolicySelection must be used within PolicySelectionProvider');
  }
  return context;
}
