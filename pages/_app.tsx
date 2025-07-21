import type { AppProps } from 'next/app';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import '../global.css';
 // adjust path if your CSS is elsewhere

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={100}>
      <Component {...pageProps} />
    </TooltipProvider>
  );
}

