import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AlertCenter from './pages/AlertCenter';
import ResourceMonitor from './pages/ResourceMonitor';
import PodAnalysis from './pages/PodAnalysis';
import LogAnalysis from './pages/LogAnalysis';
import Automation from './pages/Automation';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/alerts" element={<Layout><AlertCenter /></Layout>} />
          <Route path="/resources" element={<Layout><ResourceMonitor /></Layout>} />
          <Route path="/pod-analysis" element={<Layout><PodAnalysis /></Layout>} />
          <Route path="/logs" element={<Layout><LogAnalysis /></Layout>} />
          <Route path="/automation" element={<Layout><Automation /></Layout>} />
          <Route path="/users" element={<Layout><UserManagement /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;