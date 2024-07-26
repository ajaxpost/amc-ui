import Header from '@/components/console/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col h-full">
      <Header />
      <div className=" flex-grow flex-shrink-0">{children}</div>
    </section>
  );
}
