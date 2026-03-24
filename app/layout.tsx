import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/client-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Casa de Oração & Jump | Transformando Vidas através do Reino',
  description: 'Movimento de adoração, intercessão e ensino em São José dos Campos. Projeto social Jump transformando realidades há 14 anos.',
  keywords: ['casa de oração', 'projeto jump', 'são josé dos campos', 'adoração', 'ong', 'social', 'igreja sjc'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-black text-zinc-100 font-sans antialiased min-h-screen flex flex-col selection:bg-zinc-800 selection:text-white" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
