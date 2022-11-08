const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-y-auto">
      <div className="m-auto max-w-lg min-h-full">{children}</div>
    </div>
  )
}

export default Container
