import Overflow from '@/components/region/Overflow';
import VisitPage from '@/components/region/VisitPage';

export default function Page() {
  return (
    <main className="p-6">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        页面访问
      </h2>
      <Overflow />
      <VisitPage />
    </main>
  );
}
