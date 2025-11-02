# Epic 2: Deployment na GitHub Pages

## Epic ID
2

## Title
Deployment na GitHub Pages - Automatizovaný CI/CD Pipeline

## Description
Vystavení Piškvorek projektu na veřejný internet s automatizovaným build a deploy pipeline pomocí GitHub Actions a GitHub Pages.

Po dokončení tohoto epicu bude hra živá na URL: `https://[username].github.io/piskvorky`

Automatický deploy se spustí na každý push do `main` branče.

## Status
Draft

## Acceptance Criteria

1. GitHub Pages je konfigurován a aktivní v Settings → Pages
2. GitHub Actions workflow automaticky builduje projekt na push
3. Hra je dostupná na veřejné URL (GitHub Pages)
4. Build pipeline failuje, pokud selžou testy (npm test)
5. Assets jsou správně obsluhovány z GitHub Pages (relativní cesty)
6. Responzivní design funguje na všech zařízeních přes GitHub Pages
7. Dokumentace je srozumitelná pro nové vývojáře
8. Custom domain je podporován (pokud existuje)

## Stories

### 2.1: GitHub Pages Setup & Build Configuration
- Nastavit GitHub Pages v repozitáři
- Vytvořit GitHub Actions workflow
- Konfigurovat Vite pro production build
- Nastavit automatický deploy

### 2.2: Dokumentace & Testing Setup
- Přidat README s instrukcemi
- Setup pre-deploy validation
- Ověřit responzivitu na GitHub Pages URL

## Dependencies
- Epic 1: MVP Piškvorky (COMPLETED)
- GitHub remote repository (configured)

## Notes
Fokus na:
- Automatizace - minimální ruční kroky
- Responzivita - hra musí fungovat všude
- Dokumentace - aby si to mohli ostatní nasadit sami
