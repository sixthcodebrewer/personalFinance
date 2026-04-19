import { createBrowserRouter } from 'react-router';
import { LandingPage } from './components/landing/LandingPage';
import { WizardPage } from './components/wizard/WizardPage';
import { ResultsPage } from './components/results/ResultsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/analyze',
    Component: WizardPage,
  },
  {
    path: '/results',
    Component: ResultsPage,
  },
]);
