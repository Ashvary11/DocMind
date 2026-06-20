import { AppBreadcrumb } from "@/components/AppBreadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBreadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Documents" }]}
      />
      {children}
    </>
  );
}
