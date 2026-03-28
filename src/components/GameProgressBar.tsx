import { useEffect, useRef } from 'react';

type Props = {
  current: number;
  total: number;
  label?: string;
};

export default function GameProgressBar({
  current,
  total,
  label = 'Ecos descubiertos',
}: Props) {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${progress * 100}%`;
    }
  }, [progress]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.headerRow}>
        <span style={styles.label}>{label}</span>
        <span style={styles.counter}>
          {current}/{total}
        </span>
      </div>

      <div style={styles.track}>
        <div ref={barRef} style={styles.fill} />
      </div>

      <div style={styles.percentText}>
        {Math.round(progress * 100)}% completado
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    width: '100%',
    padding: '14px',
    borderRadius: '20px',
    background: 'rgba(22, 31, 22, 0.78)',
    border: '2px solid rgba(180, 220, 140, 0.35)',
    marginBottom: '16px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  label: {
    color: '#F4F1DE',
    fontSize: '16px',
    fontWeight: 700,
  },
  counter: {
    color: '#DDE5B6',
    fontSize: '15px',
    fontWeight: 800,
  },
  track: {
    height: '20px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    width: '0%',
    background: '#8FCB5E',
    borderRadius: '999px',
    transition: 'width 0.5s ease',
  },
  percentText: {
    marginTop: '8px',
    textAlign: 'center',
    color: '#F4F1DE',
    fontSize: '13px',
    fontWeight: 600,
  },
};