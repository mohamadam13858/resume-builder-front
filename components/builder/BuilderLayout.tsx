
import { ReactNode } from 'react';

interface BuilderLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export default function BuilderLayout({ left, right }: BuilderLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      <div className="w-full md:w-1/2 lg:w-5/12 overflow-y-auto border-r p-4 md:p-6 lg:p-8">
        {left}
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-7/12 overflow-y-auto bg-muted/30 p-6 lg:p-12">
        <div className="mx-auto max-w-[21cm] min-h-[29.7cm] bg-white shadow-2xl rounded-lg overflow-hidden">
          {right}
        </div>
      </div>
    </div>
  );
}