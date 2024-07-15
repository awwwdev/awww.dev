export default function WithSidebar({ children, gap }: { children?: React.ReactNode; gap?: string }) {
  return (
    <div className="flex flex-wrap flex-row-reverse" style={{ gap }}>
      {children}
    </div>
  );
}

function Main({ minWidthPercentage = 70, children }: { children?: React.ReactNode; minWidthPercentage: number }) {
  return <div style={{ flexBasis: 0, flexGrow: 999, minWidth: `${minWidthPercentage}%` }}>{children}</div>;
}

function Sidebar({ children }: { children?: React.ReactNode }) {
  return <div style={{ flexGrow: 1 }}>{children}</div>;
}

WithSidebar.Main = Main;
WithSidebar.Sidebar = Sidebar;
