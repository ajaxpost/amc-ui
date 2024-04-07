import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overflow from "@/components/error/overflow";
import ErrorList from "@/components/error/error-list";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  return (
    <div className="p-4">
      <Tabs defaultValue="overflow" className="w-full">
        <TabsList>
          <TabsTrigger value="overflow">概览</TabsTrigger>
          <TabsTrigger value="error-list">错误列表</TabsTrigger>
        </TabsList>
        <TabsContent value="overflow">
          <Overflow searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="error-list">
          <ErrorList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
