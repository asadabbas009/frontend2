import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./VitalMonitor.css"; // Ensure this file exists

const VitalMonitor = () => {
  const [sensorCommand, setSensorCommand] = useState("STOP");

  const bpChartRef = useRef(null);
  const spo2ChartRef = useRef(null);
  const pulseChartRef = useRef(null);

  const bpChartInstance = useRef(null);
  const spo2ChartInstance = useRef(null);
  const pulseChartInstance = useRef(null);

  const [bpValue, setBpValue] = useState(0);
  const [spo2Value, setSpo2Value] = useState(0);
  const [pulseValue, setPulseValue] = useState(0);

  useEffect(() => {
    if (bpChartRef.current && !bpChartInstance.current) {
      bpChartInstance.current = new Chart(bpChartRef.current, {
        type: "line",
        data: {
          labels: Array(50).fill(""),
          datasets: [{
            data: Array(50).fill(100), // Initialize with a value (not 0 or undefined)
            borderColor: "red",
            borderWidth: 2,
          }],
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 90, max: 150 } } },
      });
    }
  
    if (spo2ChartRef.current && !spo2ChartInstance.current) {
      spo2ChartInstance.current = new Chart(spo2ChartRef.current, {
        type: "line",
        data: {
          labels: Array(50).fill(""),
          datasets: [{
            data: Array(50).fill(98), // Set initial values
            borderColor: "blue",
            borderWidth: 2,
          }],
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 90, max: 100 } } },
      });
    }
  
    if (pulseChartRef.current && !pulseChartInstance.current) {
      pulseChartInstance.current = new Chart(pulseChartRef.current, {
        type: "line",
        data: {
          labels: Array(50).fill(""),
          datasets: [{
            data: Array(50).fill(75), // Initialize with normal values
            borderColor: "yellow",
            borderWidth: 2,
          }],
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 50, max: 120 } } },
      });
    }
  }, []);
  
  

  useEffect(() => {
    const fetchSensorStatus = () => {
      fetch("http://your-backend-ip:4000/sensor-status")
        .then((response) => response.json())
        .then((data) => setSensorCommand(data.command))
        .catch((error) => console.error("Error fetching sensor status:", error));
    };

    const interval = setInterval(fetchSensorStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateCharts = () => {
      if (!bpChartInstance.current || !spo2ChartInstance.current || !pulseChartInstance.current) return;
  
      if (sensorCommand === "START") {
        const newBp = Math.floor(Math.random() * (140 - 90 + 1)) + 90;
        const newSpo2 = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
        const newPulse = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
  
        setBpValue(newBp);
        setSpo2Value(newSpo2);
        setPulseValue(newPulse);
  
        // Ensure data is added correctly
        const shiftData = (chart, newValue) => {
          if (chart.data.datasets[0].data.length >= 50) {
            chart.data.datasets[0].data.shift(); // Remove oldest value
          }
          chart.data.datasets[0].data.push(newValue); // Add new value
          chart.update();
        };
  
        shiftData(bpChartInstance.current, newBp);
        shiftData(spo2ChartInstance.current, newSpo2);
        shiftData(pulseChartInstance.current, newPulse);
      }
    };
  
    const interval = setInterval(updateCharts, 1000);
    return () => clearInterval(interval);
  }, [sensorCommand]);
  
  

  return (
    <div className="vital-monitor">
      <h2>ICU Vital Monitoring</h2>
      <p>Sensor Status: <strong>{sensorCommand}</strong></p>

      <div className="vital-section">
        <div className="graph-container">
          <h3>Blood Pressure</h3>
          <canvas ref={bpChartRef}></canvas>
        </div>
        <div className="value-container">
          <h3>BP</h3>
          <p className="vital-value">{bpValue} mmHg</p>
        </div>
      </div>

      <div className="vital-section">
        <div className="graph-container">
          <h3>SpO2</h3>
          <canvas ref={spo2ChartRef}></canvas>
        </div>
        <div className="value-container">
          <h3>SpO2</h3>
          <p className="vital-value">{spo2Value}%</p>
        </div>
      </div>

      <div className="vital-section">
        <div className="graph-container">
          <h3>Pulse Rate</h3>
          <canvas ref={pulseChartRef}></canvas>
        </div>
        <div className="value-container">
          <h3>Pulse</h3>
          <p className="vital-value">{pulseValue} bpm</p>
        </div>
      </div>
    </div>
  );
};

export default VitalMonitor;
