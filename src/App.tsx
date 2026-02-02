import React from 'react';
import './App.css';
import DashBoard from './Components/DashBoard';
import { DragDropProvider } from './Context/DragDropContext';

function App() {
  return (
    <div className="App">
      <DragDropProvider>
      <DashBoard />
    </DragDropProvider>
    </div>
  );
}

export default App;
