import AppNavbar from "./AppNavbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
