// src/lib/withTimer.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import TimerTracker from './TimerTracker';

export function withTimer(Component, protocolId) {
  return function Wrapped(props) {
    const location            = useLocation();
    const registrationId      = location.state?.registration_id;

    // (Optional) Debug:
    console.log(`withTimer(${protocolId}) got registrationId:`, registrationId);

    return (
      <TimerTracker
        protocolId={protocolId}
        registrationId={registrationId}
      >
        <Component {...props} />
      </TimerTracker>
    );
  };
}
