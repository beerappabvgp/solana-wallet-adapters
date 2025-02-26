"use client";

export default function SimpleDemo() {
  console.log("🔄 SimpleDemo is rendering!");
  
  return (
    <div>
      <h2>Simple Demo</h2>
      <p>Render Time: {new Date().toISOString()}</p>
    </div>
  );
}