"use client";

type Snowflake = {
  left: string;
  delay: string;
  duration: string;
};

const flakes: Snowflake[] = Array.from({ length: 30 }).map(() => ({
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${10 + Math.random() * 10}s`,
}));

console.log("Snow mounted");

export default function Snow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {flakes.map((flake, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
          }}
        />
      ))}
    </div>
  );
}
