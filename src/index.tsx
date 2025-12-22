import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { onCLS, onLCP, onFCP, onINP, onTTFB } from 'web-vitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Web Vitals reporting
function sendToAnalytics(metric: any) {
  // You can send metrics to your analytics service here
  console.log(metric);
}

onCLS(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onINP(sendToAnalytics);
onTTFB(sendToAnalytics);
