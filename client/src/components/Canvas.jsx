import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

const Canvas = () => {
  //   const canvasRef = useRef(null);
  //   const ctxRef = useRef(null);
  //   const [isDrawing, setIsDrawing] = useState(false);

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     canvas.width = window.innerWidth * 0.8;
  //     canvas.height = window.innerHeight * 0.6;
  //     const ctx = canvas.getContext('2d');
  //     ctx.lineCap = 'round';
  //     ctx.strokeStyle = 'black';
  //     ctx.lineWidth = 3;
  //     ctxRef.current = ctx;
  //   }, []);

  //   const startDrawing = (e) => {
  //     ctxRef.current.beginPath();
  //     ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //     setIsDrawing(true);
  //   };

  //   const draw = (e) => {
  //     if (!isDrawing) return;
  //     ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //     ctxRef.current.stroke();
  //   };

  //   const stopDrawing = () => {
  //     ctxRef.current.closePath();
  //     setIsDrawing(false);
  //   };

  //   return (
  //     <canvas
  //       ref={canvasRef}
  //       onMouseDown={startDrawing}
  //       onMouseMove={draw}
  //       onMouseUp={stopDrawing}
  //       onMouseLeave={stopDrawing}
  //       style={{ border: '1px solid #000', background: '#fff' }}
  //     />
  //   );

  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
