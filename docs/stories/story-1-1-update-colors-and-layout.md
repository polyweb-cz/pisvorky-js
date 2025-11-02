# Story 1.1: Update barvy a layout - hlavní panel

## Epic
Epic 1: Design & UI Refresh

## User Story

Jako hráč
Chci, aby hra měla moderní design s novými barvami
Abych měl lepší vizuální zážitek při hraní

## Description

Aktualizovat hlavní panel hry - změní barvu pozadí na `#648187` (nude šedá), tlačítka na `#EB5E00` (oranžová). Odebrat "Piškvorky" z h1 nadpisu a umístit "Na tahu" indikátor pod nadpis.

## Tasks

### Task 1: Update HTML struktura (src/index.html)
- [ ] Změnit h1 - odebrat "Piškvorky" text (ponechat pouze nadpis bez dalšího textu)
- [ ] Přesunout "Na tahu: X/O" div pod h1 (do header sekce, ale odděleně)
- [ ] Ověřit, že struktura je validní

### Task 2: Update CSS - barvy (src/styles.css)
- [ ] Nastavit `body` background na `#648187`
- [ ] Nastavit `.reset-button` background na `#EB5E00`
- [ ] Nastavit `.obstacle-toggle` button background na `#EB5E00`
- [ ] Aktualizovat `:hover` stav pro tlačítka (např. darší `#D64A00`)
- [ ] Zajistit, že text na tlačítkách je čitelný (bílý text)

### Task 3: Update layout - "Na tahu" indikátor
- [ ] Přesunout `.turn-indicator` pod h1 v header sekci
- [ ] Stylovat jako čitelný indikátor (velký text, jasná barva)
- [ ] Zajistit spacing

### Task 4: Ověřit bombu viditelnost
- [ ] Zkontrolovat, jak vypadá bomba/image na šedém pozadí
- [ ] Pokud je černá, změnit na vhodnou barvu (např. `#EB5E00` nebo odebrat)

## Acceptance Criteria

1. **AC1:** Pozadí je `#648187`
2. **AC2:** Tlačítka jsou `#EB5E00` s vhodným hover efektem
3. **AC3:** "Na tahu: X/O" je pod nadpisem, jasně viditelné
4. **AC4:** Bomba/image je viditelná na šedém pozadí
5. **AC5:** Všechny prvky jsou čitelné a viditelné
6. **AC6:** Struktura HTML je logická a validní

## Test Plan

1. Otevřit aplikaci v prohlížeči
2. Zkontrolovat barvy pozadí a tlačítek
3. Ověřit umístění "Na tahu" indikátoru
4. Hrát hru a ověřit, že všechno funguje
5. Zkontrolovat na 1920×927

## Notes

- Bez změn ve funkčnosti hry
- Čistě CSS a malé HTML úpravy
- Fokus na vizuál
