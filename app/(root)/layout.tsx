import { AppSidebar } from "@/components/common/app-sidebar";
import Header from "@/components/common/header";
import HeaderIntro from "@/components/common/header-intro";
import PageContainer from "@/components/common/page-containter";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
