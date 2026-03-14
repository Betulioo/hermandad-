import { cn } from '@/lib/utils/cn';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'content-sm',
  md: 'content-md',
  lg: 'content-lg',
  xl: 'content-xl',
  '2xl': 'content-2xl',
};

export function Container({ children, size = 'xl', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  );
}
