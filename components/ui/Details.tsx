export default function Details(props: {
  onToggle: () => void;
  className?: string;
  summaryLabel: string;
  children?: React.ReactNode;
  open: boolean;
}) {
  return (
    <details className='' open={props.open} onToggle={props.onToggle}>
      <summary
        className={`font-display flex items-center gap-1 after:h-3px  after:inline-block after:bg-base5 after:grow after:content-empty
       bf-i-ph-arrow-right before:bg-base11 before:c-base11 !before:mie-0 `}
      >
        <span className='mie-1'>{props.summaryLabel}</span>
      </summary>
      <div className={`  ${props.className}`}>{props.children}</div>
    </details>
  );
}
