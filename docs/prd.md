# Piškvorky 15×15 - Product Requirements Document

## 01 Vision

**Cíl:**
Jednoduché piškvorky 15×15 v prohlížeči. Uživatel hraje proti člověku (1v1 na jednom zařízení). MVP bez AI.

**Hodnota:**
Vzorový projekt pro vyzkoušení BMAD (PRD→Epic→Story→Trace).

**Úspěch:**
Hra odehratelná end-to-end, jasné výhry/remízy, reset, mobilní použitelnost.

---

## 02 Scope

**In-scope:**
UI 15×15, tahy X/O, kontrola výhry/remízy, restart, základní vizuál, bez backendu.

**Out-of-scope:**
AI soupeř, online multiplayer, skóre přes relaci, zvuky/animace.

---

## 03 Personas

**Hráč:**
chce rychle odehrát hru na mobilu/PC, bez instalace.

---

## 04 Functional Requirements

FR1: Zobrazit mřížku 15×15.
FR2: Střídání X/O od prvního tahu X.
FR3: Blokovat klik na obsazené pole.
FR4: Detekce výhry v řádku/sloupci/diagonále - výhra je 5 polí v řadě.
FR5: Detekce remízy, když plná mřížka bez výhry.
FR6: Tlačítko „Nová hra" resetuje stav.
FR7: Indikátor „Na tahu: X|O".

---

## 05 Acceptance Criteria

**AC1:** Při výhře se zablokují další tahy.
**AC2:** Při remíze se zablokují tahy a zobrazí „Remíza".
**AC3:** „Nová hra" vyčistí mřížku a nastaví X na tahu.
**AC4:** UI funguje v šířce 360–1440 px.

---

## 06 Risks

**R1:** Scope creep → držet se MVP.

---

## Epics

### Epic 1: MVP Piškvorky

Základní implementace hry - mřížka, tahy, detekce výhry/remízy, UI.
