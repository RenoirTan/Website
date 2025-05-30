export default function AbsoluteCenter({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div
      className={"absolute left-[50%] top-[50%] w-full flex flex-col items-center pointer-events-none " + (className ?? "")}
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <div className="h-full flex items-center pointer-events-none">
        <div className="relative w-max h-max pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}