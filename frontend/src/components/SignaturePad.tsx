import React, { useEffect, useState, useRef } from 'react';
interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onClear: () => void;
}
export function SignaturePad({
  onSave,
  onClear
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
      }
    }
  }, []);
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  };
  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };
  const handleClear = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onClear();
  };
  const handleSave = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave(dataUrl);
  };
  return <div className="space-y-4">
      <div className="bg-white rounded-lg border-2 border-dark-border overflow-hidden">
        <canvas ref={canvasRef} width={600} height={200} className="w-full cursor-crosshair touch-none" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={handleClear} className="flex-1 px-4 py-2 rounded-lg border border-dark-border text-text-secondary hover:text-white transition-colors">
          Clear
        </button>
        <button type="button" onClick={handleSave} className="flex-1 px-4 py-2 rounded-lg bg-primary-blue text-white hover:bg-primary-hover transition-colors">
          Save Signature
        </button>
      </div>
    </div>;
}