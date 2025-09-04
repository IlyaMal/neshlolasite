export function Footer() {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h3 className="text-2xl font-serif font-bold">Это конец сайта. Но начало подготовки 🚀</h3>

        <p className="text-lg opacity-90">Не откладывай на завтра то, что можешь начать сегодня!</p>

        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"><a href = "https://t.me/neshkolaege_Bot">
          Записаться прямо сейчас</a>
        </button>

        <div className="pt-8 border-t border-background/20">
          <p className="text-sm opacity-70">© 2025 НеШкола. Делаем ЕГЭ интересным!</p>
        </div>
      </div>
    </footer>
  )
}
