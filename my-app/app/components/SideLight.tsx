"use client";

export default function SideLight() {
  return (
    <>
      {/* LEFT */}
      <div className="pointer-events-none fixed left-2 top-0 z-10 h-full flex flex-col justify-evenly">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={`L-${i}`} className={`sidelight sidelight-${i % 4}`} />
        ))}
      </div>

      {/* RIGHT */}
      <div className="pointer-events-none fixed right-2 sm:right-7 top-0 z-10 h-full flex flex-col justify-evenly">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={`R-${i}`}
            className={`sidelight sidelight-${(i + 2) % 4}`}
          />
        ))}
      </div>
    </>
  );
}
