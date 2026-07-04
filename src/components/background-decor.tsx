export function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-indigo-400/25 blur-[110px] dark:bg-indigo-500/10" />
      <div className="absolute top-1/4 -right-28 h-[24rem] w-[24rem] rounded-full bg-violet-400/20 blur-[110px] dark:bg-violet-500/10" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-sky-300/20 blur-[120px] dark:bg-sky-500/10" />
    </div>
  )
}
