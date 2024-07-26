import Overflow from '@/components/api_monitor/Overflow';
import API_TOP from '@/components/api_monitor/API_TOP';

export default function Page() {
  return (
    <div className="p-4">
      <Overflow />
      <API_TOP />
    </div>
  );
}
