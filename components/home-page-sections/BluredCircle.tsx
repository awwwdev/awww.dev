export default function BluredCircle({ top, left, radius, bg, blur }) {
  return (
    <div
      className={`absolute rd-full -z-1 pointer-events-none select-none ${bg} `}
      style={{
        top,
        left,
        width: 2 * radius,
        height: 2 * radius,
        filter: `blur(${blur})`,
        transform: 'translate(-50% , -50%)',
        pointerEvents: 'none'
      }}
    ></div>
  );
}
