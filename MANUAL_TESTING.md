# Manuální testování - Story 1.1

## Návod na spuštění aplikace

### Metoda 1: Vite Dev Server (Doporučeno)
```bash
npm run dev
```
Otevřete prohlížeč na adrese, kterou Vite vypíše (obvykle http://localhost:5173)

### Metoda 2: Přímo v prohlížeči
Otevřete soubor `/home/steinbauer/PhpstormProjects/piskvorky/src/index.html` přímo v prohlížeči.

## Manual Testing Checklist

### AC1.1: Mřížka 15×15 je vykreslena
- [ ] Otevřete aplikaci v prohlížeči
- [ ] Zkontrolujte, že vidíte mřížku 15×15 polí
- [ ] Všechna pole jsou viditelná a klikatelná
- [ ] Mřížka je správně zarovnaná a stylovaná

### AC1.2: Po kliknutí se zobrazí X nebo O v pořadí
- [ ] Klikněte na libovolné pole → zobrazí se **X**
- [ ] Klikněte na jiné pole → zobrazí se **O**
- [ ] Klikněte na další pole → zobrazí se **X**
- [ ] Klikněte na další pole → zobrazí se **O**
- [ ] Ověřte, že střídání pokračuje (X→O→X→O...)

### AC1.3: Kliknutí na obsazené pole nemá efekt
- [ ] Klikněte na pole a označte ho (např. X)
- [ ] Klikněte na stejné pole znovu
- [ ] Ověřte, že se symbol nezměnil (stále X)
- [ ] Ověřte, že se nepřepnul aktuální hráč (stále O na tahu)

### AC1.4: Indikátor ukazuje, který hráč je na tahu
- [ ] Na začátku hry se zobrazuje "Na tahu: X"
- [ ] Po prvním tahu se změní na "Na tahu: O"
- [ ] Po druhém tahu se změní na "Na tahu: X"
- [ ] Indikátor se aktualizuje po každém úspěšném tahu

### AC1.5: Tahy se ukládají do game state
- [ ] Otevřete Developer Console (F12)
- [ ] Napište `game.getGameState()` a stiskněte Enter
- [ ] Po několika tazích znovu spusťte `game.getGameState()`
- [ ] Ověřte, že vidíte 2D array s hodnotami 'X' a 'O' na správných pozicích
- [ ] Ověřte historii tahů: `game.moveHistory`

### Responsivní test

#### Mobilní (360px)
- [ ] Otevřete Chrome DevTools (F12)
- [ ] Zapněte Device Toolbar (Ctrl+Shift+M)
- [ ] Nastavte rozlišení na 360×640
- [ ] Ověřte, že UI je čitelné a použitelné
- [ ] Ověřte, že mřížka se vejde na obrazovku
- [ ] Ověřte, že pole jsou dostatečně velká pro kliknutí prstem

#### Tablet (768px)
- [ ] Nastavte rozlišení na 768×1024
- [ ] Ověřte správné zobrazení
- [ ] Ověřte, že je UI pohodlně použitelné

#### Desktop (1440px)
- [ ] Nastavte rozlišení na 1440×900
- [ ] Ověřte správné zobrazení
- [ ] Ověřte, že mřížka není příliš velká nebo malá

### Funkce Reset
- [ ] Zahrajte několik tahů
- [ ] Klikněte na tlačítko "Nová hra"
- [ ] Ověřte, že se mřížka vyčistila
- [ ] Ověřte, že indikátor ukazuje "Na tahu: X"
- [ ] Ověřte, že můžete kliknout na pole, která byla dříve obsazená

### Cross-browser testing
- [ ] Chrome - všechny funkce fungují
- [ ] Firefox - všechny funkce fungují
- [ ] Safari - všechny funkce fungují (pokud dostupný)
- [ ] Edge - všechny funkce fungují

### Performance test
- [ ] Rychle klikněte na několik polí po sobě
- [ ] Ověřte, že UI reaguje bez zpoždění
- [ ] Ověřte, že nedochází k viditelným bugům nebo graphical glitches

## Známé limitace (v rámci MVP)
- Žádné animace při tazích
- Žádná kontrola výhry (bude v další story)
- Žádné zvukové efekty
- Žádné AI protihráče (oba hráči hrají lokálně)

## Reportování bugů
Pokud najdete bug, zdokumentujte:
1. Kroky k reprodukci
2. Očekávané chování
3. Aktuální chování
4. Screenshot (pokud relevantní)
5. Prohlížeč a rozlišení obrazovky
