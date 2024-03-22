import Header from '@/components/console/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </section>
  );
}
