import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'rsuite/dist/rsuite.min.css';
import './index.css';
import Auth0Wrapper from 'Auth0Wrapper';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Auth0Wrapper>
    <App />
  </Auth0Wrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
