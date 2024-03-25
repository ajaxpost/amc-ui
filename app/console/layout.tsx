import Header from '@/components/console/header';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { OverflowNavPanle } from '@/components/console/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col h-full">
      <Header />
      <div className=" flex-grow flex-shrink-0">
        <ResizablePanelGroup direction="horizontal">
          <OverflowNavPanle />
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
}
