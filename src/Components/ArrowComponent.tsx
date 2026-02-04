import { useEffect, useState } from "react";
import "./ArrowComponent.css";

const ArrowComponent = ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
  const [style, setStyle] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const fromEl = document.getElementById(`layer-${fromIndex}`);
    const toEl = document.getElementById(`layer-${toIndex}`);

    if (!fromEl || !toEl) return;

    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const top = fromRect.top + fromRect.height;
    const height = toRect.top - fromRect.bottom;

    setStyle({ top, height });
  }, [fromIndex, toIndex]);

  if (!style) return null;

  return (
    <div
      className="arrow-wrapper">
      <div className="arrow-line" />
      <div className="arrow-head" />
    </div>
  );
};

export default ArrowComponent;
