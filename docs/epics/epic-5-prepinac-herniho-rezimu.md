# Epic 5: Přepínač herních režimů

## Epic ID
5

## Název
Přepínač mezi hrou dvou hráčů a hrou proti počítači

## Popis

Umožnit hráčům jednoduše zvolit, zda chtějí hrát lokální hru dvou hráčů, nebo se utkat proti počítači. Epic pokrývá návrh UI prvku, napojení na stav hry i rozšíření logiky o jednoduchou AI tak, aby přepnutí režimu fungovalo bez přerušení rozehrané partie.

## Status
Proposed

## Cíle

- Nabídnout jasný a dostupný ovládací prvek pro volbu herního režimu
- Uchovávat zvolený režim v průběhu sezení a správně na něj reagovat ve hře
- Implementovat protivníka řízeného počítačem včetně deterministického fallbacku
- Zajistit, aby dvouhráčový režim zůstal beze změn a bez regresí

## Požadavky

### Uživatelská zkušenost
- Přepínač režimu je viditelný na úvodní obrazovce i během hry
- Výchozí režim je "Hráč vs. hráč" (PVP)
- Přepnutí režimu jasně komunikuje, kdo táhne a jak se chovají tlačítka

### Stav a logika
- Stav zvoleného režimu je dostupný pro komponenty obsluhující tahy a AI
- Přepnutí na AI režim automaticky spouští tah počítače v případě, že je na řadě
- Přepnutí zpět na PVP zachová aktuální stav hry a vypne volání AI

### Testování a kvalita
- Automatické testy pokrývají oba režimy a základní chování AI
- UX i logika pro PVP režim zůstává plně funkční

## Akceptační kritéria

1. Přepínač režimu je vizuálně dostupný a reaguje na uživatelský vstup
2. Stav hry respektuje zvolený režim včetně správného střídání tahů
3. V režimu proti počítači AI provádí tah do rozumného časového limitu
4. Přepnutí během rozehrané hry nepoškodí průběh partie ani historii tahů
5. Dvouhráčový režim se chová stejně jako ve stávající verzi aplikace

## Stories

- **Story 5.1:** Přepínač režimu v uživatelském rozhraní
- **Story 5.2:** Stav a logika herních režimů
- **Story 5.3:** AI protivník a testy herních režimů

## Poznámky

- Počítá se s jednoduchou AI (např. heuristika nebo náhodný výběr s validací)
- Dlouhodobě lze uvažovat o rozšíření AI o vyšší obtížnosti
- Při implementaci zachovat kompatibilitu s URL parametry a ukládáním stavu, pokud existují
