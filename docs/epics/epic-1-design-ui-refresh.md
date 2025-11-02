# Epic 1: Design & UI Refresh

## Overview

Refresh design a UI piškvorek podle nové design specifikace. Cílem je modernější, čistší vizuál s optimalizací pro desktop (1920×927) bez nutnosti scrollování.

## Goals

- Aktualizovat barvy (pozadí: `#648187`, tlačítka: `#EB5E00`)
- Zjednodušit UI - odebrat "Piškvorky" nadpis
- Přesunout "Na tahu" indicator pod nadpis
- Optimalizovat padding/margin footeru
- Zajistit, že vše se vejde na 1920×927 bez scrollování

## Requirements

### Design Changes
- **Barva pozadí:** `#648187` (nude šedá)
- **Barva tlačítek:** `#EB5E00` (oranžová)
- **H1 nadpis:** Odebrat "Piškvorky" - nechat pouze "Piškvorky test 3" nebo změnit podle finálního textu
- **"Na tahu" indikátor:** Umístit pod nadpis, ne vedle něj
- **Footer:** Zmenšit padding a margin, aby zabíral méně místa

### Responsive Design
- Primární target: **1920×927** (desktop, bez scrollování)
- Zachovat responsivitu pro menší obrazovky (360–1440 px)
- Hra se musí vejít na obrazovku bez scrollování

### Technical Constraints
- Nejsou nové komponenty, jen CSS změny
- HTML struktura zůstane zachována
- Veškeré změny v `styles.css`

## Acceptance Criteria

1. **AC1:** Pozadí je `#648187` a tlačítka jsou `#EB5E00`
2. **AC2:** "Na tahu" indikátor je pod nadpisem
3. **AC3:** Na 1920×927 se vejde vše bez scrollování (grid + kontroly + footer)
4. **AC4:** Design vypadá moderně a čistě
5. **AC5:** Bomba (pokud je součástí) je viditelná na šedém pozadí (není černá)

## Stories

- **Story 1.1:** Update barvy a layout - hlavní panel
- **Story 1.2:** Optimalizace footeru
- **Story 1.3:** Testing & refinement na 1920×927

## Notes

- Fokus na CSS, ne na funkčnost
- Bomba by měla být změněna na vhodnou barvu (nebo odstraněna, pokud je součástí designu)
- Po dokončení by měl web vypadat profesionálněji a čistěji
