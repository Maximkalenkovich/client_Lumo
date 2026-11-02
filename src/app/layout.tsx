/** Required because `not-found.tsx` lives at the root; the real layout is `[locale]/layout.tsx`. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
