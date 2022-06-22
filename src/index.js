import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapasApp } from './MapasApp';
// had this. 
import 'mapbox-gl/dist/mapbox-gl.css';

// added the following 6 lines.
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MapasApp />);
