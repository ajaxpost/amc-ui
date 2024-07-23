import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overflow from '@/components/http_error/overflow';

export default function Page() {
  return (
    <div className="p-4">
      <Tabs defaultValue="overflow" className="w-full">
        <TabsList>
          <TabsTrigger value="overflow">概览</TabsTrigger>
        </TabsList>
        <TabsContent value="overflow">
          <Overflow />
        </TabsContent>
      </Tabs>
    </div>
  );
}
