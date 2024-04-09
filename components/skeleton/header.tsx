import { Skeleton } from '@/components/ui/skeleton';

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Skeleton className="w-[200px] h-9" />
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Skeleton className="w-7 h-5" />
          <Skeleton className="w-7 h-5" />
          <Skeleton className="w-7 h-5" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
      </div>
    </header>
  );
}
