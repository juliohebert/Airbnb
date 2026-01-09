<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1UNiHaJAfTruh4NWoj-ghGKZlKB8HRavV

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Como testar o Admin de Licenças:
Acesse a rota secreta: #/super-admin.
A senha mestra de demonstração é admin123.
Lá você verá todos os usuários cadastrados.
Ao clicar em Suspender, o link do hóspede desse anfitrião específico parará de funcionar imediatamente, exibindo uma mensagem de "Guia Indisponível".
Ao clicar em Reativar, o guia volta ao ar instantaneamente.