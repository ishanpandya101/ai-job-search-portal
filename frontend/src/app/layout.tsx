import "./globals.css";
import { ThemeProvider } from "../components/shared/ThemeProvider";

export const metadata = {
  title: "HireBridge | Find Jobs, Build a Stronger Resume, and Get Hired",
  description: "A complete job search platform with resume screening, career tools, and access to top opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col font-sans">
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
