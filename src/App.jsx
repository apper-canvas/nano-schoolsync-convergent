import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Students from '@/components/pages/Students';
import Classes from '@/components/pages/Classes';
import Attendance from '@/components/pages/Attendance';
import Grades from '@/components/pages/Grades';
import Announcements from '@/components/pages/Announcements';
import Schedule from '@/components/pages/Schedule';
import Settings from '@/components/pages/Settings';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="grades" element={<Grades />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="font-body"
      />
    </div>
  );
}

export default App;