function Header() {
  return (
    <header className="text-center py-8" role="banner">
      <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4">
        <span aria-label="משחקים לילדים">🎮 משחקים לילדים 🎮</span>
      </h1>
      <p className="text-xl md:text-2xl text-purple-600 font-semibold" role="doc-subtitle">
        משחקים מהנים לגיל 2-5!
      </p>
    </header>
  );
}

export default Header;
