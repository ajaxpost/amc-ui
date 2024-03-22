import SearchSelect from './search-select';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <SearchSelect />
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Overview
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Overview
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Overview
          </Link>
        </div>
      </div>
    </header>
  );
}
