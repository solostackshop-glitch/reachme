'use client';

import { useEffect, useState } from 'react';

function timeAgo(isoString) {
  if (!isoString) return 'never';
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Page() {
  const [data, setData] = useState(null);
  const [tick, setTick] = useState(0);

  async function fetchStatus() {
    try {
      const res = await fetch('/api/status');
      const json = await res.json();
      setData(json);
    } catch (e) {
      // silently retry
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      fetchStatus();
      setTick(t => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Force time-ago label to update every 30s without re-fetching
  useEffect(() => {}, [tick]);

  const isWifi = data?.status === 'wifi';
  const isData = data?.status === 'data';
  const isUnknown = !data || data.status === 'unknown';

  const bgColor = isWifi ? '#0a84ff' : isData ? '#30d158' : '#636366';
  const emoji = isWifi ? '📶' : isData ? '📱' : '❓';
  const headline = isWifi
    ? 'Trae is on WiFi'
    : isData
    ? 'Trae is on Data'
    : 'Status Unknown';
  const subtext = isWifi
    ? 'iMessage works — send a text or iMessage'
    : isData
    ? 'Data only — WhatsApp works best right now'
    : 'Not sure how to reach Trae right now';
  const contactLine = isWifi
    ? '✅ iMessage  ·  ✅ WhatsApp  ·  ✅ Regular SMS'
    : isData
    ? '⚠️ iMessage may be slow  ·  ✅ WhatsApp  ·  ✅ Regular SMS'
    : null;

  return (
    <main style={{
      minHeight: '100vh',
      background: '#111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: '#1c1c1e',
        borderRadius: '24px',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}>

        {/* Status orb */}
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: bgColor,
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          boxShadow: `0 0 40px ${bgColor}66`,
          transition: 'all 0.4s ease',
        }}>
          {emoji}
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 12px',
          letterSpacing: '-0.5px',
        }}>
          {headline}
        </h1>

        <p style={{
          color: '#aeaeb2',
          fontSize: '17px',
          lineHeight: '1.5',
          margin: '0 0 28px',
        }}>
          {subtext}
        </p>

        {contactLine && (
          <div style={{
            background: '#2c2c2e',
            borderRadius: '14px',
            padding: '16px 20px',
            color: '#e5e5ea',
            fontSize: '14px',
            lineHeight: '1.8',
            marginBottom: '28px',
          }}>
            {contactLine}
          </div>
        )}

        <p style={{
          color: '#48484a',
          fontSize: '13px',
          margin: 0,
        }}>
          {data?.updatedAt
            ? `Updated ${timeAgo(data.updatedAt)} · refreshes every 30s`
            : 'Waiting for status…'}
        </p>
      </div>
    </main>
  );
}
