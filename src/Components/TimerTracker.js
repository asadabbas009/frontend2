// src/components/TimerTracker.js

import { useEffect, useRef } from 'react';
import axios from 'axios';

export default function TimerTracker({ protocolId, registrationId, children }) {
  const startRef = useRef(Date.now());
  const API_BASE = process.env.REACT_APP_API_URL || '';

  // SPA navigation
  useEffect(() => {
    const startTime = startRef.current;
    return () => {
      const endTimeMs = Date.now();
      const duration  = Math.floor((endTimeMs - startTime) / 1000);
      if (!registrationId) return;

      axios.post(`${API_BASE}/api/protocol-time`, {
        registrationId,
        protocolId,
        startTime: new Date(startTime).toISOString(),
        endTime:   new Date(endTimeMs).toISOString(),
        duration
      }).catch(console.error);
    };
  }, [protocolId, registrationId, API_BASE]);

  // Hard reload or tab-close
  useEffect(() => {
    const startTime = startRef.current;
    const onUnload = () => {
      const endTimeMs = Date.now();
      const duration  = Math.floor((endTimeMs - startTime) / 1000);
      if (!registrationId) return;

      const payload = JSON.stringify({
        registrationId,
        protocolId,
        startTime: new Date(startTime).toISOString(),
        endTime:   new Date(endTimeMs).toISOString(),
        duration
      });
      navigator.sendBeacon(`${API_BASE}/api/protocol-time`, payload);
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [protocolId, registrationId, API_BASE]);

  return children;
}
