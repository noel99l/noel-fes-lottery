import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'のえるフェスvol.5 バンド抽選',
  description: 'のえるフェスvol.5のバンド抽選アプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}