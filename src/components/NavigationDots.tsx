interface NavigationDotsProps {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
}

export default function NavigationDots({ total, current, onNavigate }: NavigationDotsProps) {
  return (
    <div className="fixed right-7 top-1/2 -translate-y-1/2 flex flex-col gap-3 max-sm:hidden" style={{ zIndex: 9100 }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={`w-[5px] h-[5px] rounded-full transition-all duration-300 cursor-pointer ${
            i === current
              ? 'bg-gold scale-[1.7]'
              : 'bg-gold/20 hover:bg-gold/40'
          }`}
        />
      ))}
    </div>
  );
}
