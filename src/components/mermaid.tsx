'use client';

import { useEffect, useId, useMemo, useState } from 'react';

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const reactId = useId();
  const chartId = useMemo(() => `ajar-mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`, [reactId]);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        setError(null);
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'neutral',
        });

        const result = await mermaid.render(chartId, chart);
        if (!cancelled) setSvg(result.svg);
      } catch (cause) {
        if (!cancelled) {
          setSvg('');
          setError(cause instanceof Error ? cause.message : 'Unable to render Mermaid diagram.');
        }
      }
    }

    void renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, chartId]);

  return (
    <figure className="my-6 overflow-x-auto rounded-lg border bg-fd-card p-4">
      {svg ? (
        <div
          className="min-w-[640px] [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : error ? (
        <pre className="whitespace-pre-wrap text-sm text-fd-muted-foreground">{chart}</pre>
      ) : (
        <div className="h-40 animate-pulse rounded-md bg-fd-muted" aria-label="Rendering Mermaid diagram" />
      )}
    </figure>
  );
}
