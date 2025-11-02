# Story 1.2: Stylizace zavíracího tlačítka

## Epic
Epic 1: Design & UI Refresh

## User Story

Jako hráč
Chci, aby zavírací tlačítko modálu mělo stejný design jako ostatní tlačítka
Abych měl konzistentní vizuální zážitek

## Description

Změnit barvu zavíracího tlačítka v modálu (button "Zavřít" po skončení hry) na oranžovou `#EB5E00` s hover efektem, stejně jako ostatní tlačítka v aplikaci.

## Tasks

### Task 1: Update CSS - modal button barva
- [ ] Zmenit `.modal-button` background na `#EB5E00`
- [ ] Zmenit `.modal-button:hover` background na `#D64A00` (tmavší oranžová)
- [ ] Zmenit box-shadow hover efektu na oranžovou barvu
- [ ] Ověřit, že text zůstane bílý a čitelný

## Acceptance Criteria

1. **AC1:** Zavírací tlačítko má barvu `#EB5E00`
2. **AC2:** Hover efekt má barvu `#D64A00`
3. **AC3:** Text je bílý a čitelný
4. **AC4:** Tlačítko vypadá konzistentně s ostatními tlačítky v aplikaci

## Test Plan

1. Otevřít aplikaci
2. Vyhrát hru (aby se zobrazil modál)
3. Zkontrolovat barvu zavíracího tlačítka
4. Zkontrolovat hover efekt
5. Ověřit konzistenci s "Nová hra" tlačítkem

## Notes

- Změna pouze CSS
- Bez změn ve funkčnosti
