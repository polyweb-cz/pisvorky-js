# Epic 4: Design & UI Refresh

## Epic ID
4

## Title
Design & UI Refresh - Modernizace vizuálu

## Description

Refresh design a UI piškvorek podle nové design specifikace. Cílem je modernější, čistší vizuál s optimalizací pro desktop (1920×927) bez nutnosti scrollování.

## Status
Completed

## Goals

- Aktualizovat barvy (pozadí: `#648187`, tlačítka: `#EB5E00`)
- Zjednodušit UI - odebrat "Piškvorky" nadpis
- Přesunout "Na tahu" indicator do headeru
- Optimalizovat padding/margin footeru
- Zajistit, že vše se vejde na 1920×927 bez scrollování

## Requirements

### Design Changes
- **Barva pozadí:** `#648187` (nude šedá)
- **Barva tlačítek:** `#EB5E00` (oranžová)
- **H1 nadpis:** Odebrán (úspora místa)
- **"Na tahu" indikátor:** Umístěn do headeru
- **Footer:** Zmenšen padding a margin

### Responsive Design
- Primární target: **1920×927** (desktop, bez scrollování)
- Zachovat responsivitu pro menší obrazovky (360–1440 px)

### Technical Constraints
- Pouze CSS změny
- HTML struktura minimálně upravena
- Veškeré změny v `styles.css`

## Acceptance Criteria

1. **AC1:** Pozadí je `#648187` a tlačítka jsou `#EB5E00`
2. **AC2:** "Na tahu" indikátor je v headeru
3. **AC3:** Na 1920×927 se vejde vše bez scrollování
4. **AC4:** Design vypadá moderně a čistě
5. **AC5:** Bomba je viditelná na šedém pozadí

## Stories

- **Story 4.1:** Update barvy a layout - hlavní panel
- **Story 4.2:** Stylizace zavíracího tlačítka modálu

## Notes

- Fokus na CSS, ne na funkčnost
- Bomba by měla být změněna na vhodnou barvu (nebo odstraněna, pokud je součástí designu)
- Po dokončení by měl web vypadat profesionálněji a čistěji
