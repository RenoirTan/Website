export default function AbsoluteCenter({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute left-[50%] top-[50%] w-full flex flex-col items-center"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <div className="h-full flex items-center">
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  )
}