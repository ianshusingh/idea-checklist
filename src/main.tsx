import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import { Toaster } from 'sonner'
import AppLoader from '@/components/app-contents/app-loader.tsx'

const App = lazy(()=>import("@/App.tsx"));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster/>
      <Suspense fallback={<AppLoader/>}>
        <App/>
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
)