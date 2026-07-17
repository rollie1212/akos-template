# AKOS Portfolio Template

Create a personal career portfolio from structured profile data and an optional Markdown-grounded DeepSeek assistant.

## Create your repository

Use GitHub's **Use this template** button or open:

https://github.com/rollie1212/akos-template/generate

This creates an independent repository in your own GitHub account.

## 1. Replace the demo profile

Edit:

```text
career-data/profile.json
```

Use only verified professional information. The template validates the JSON structure with Zod.

## 2. Add AI knowledge

Replace the demo Markdown file inside:

```text
knowledge/
```

Recommended files:

```text
knowledge/profile.md
knowledge/experience.md
knowledge/projects.md
knowledge/skills.md
knowledge/claim-boundaries.md
```

The assistant answers only from these Markdown files.

## 3. Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 4. Deploy to Vercel

1. Import your new GitHub repository into Vercel.
2. Keep the detected Next.js settings.
3. Add `DEEPSEEK_API_KEY` under Project Settings → Environment Variables.
4. Optionally add `DEEPSEEK_MODEL=deepseek-chat`.
5. Deploy or redeploy the project.

The portfolio works without a DeepSeek key. The AI chat requires the key.

## Security

- Never commit `.env` or a real API key.
- Never prefix the secret with `NEXT_PUBLIC_`.
- Remove private contact details before publishing.
- Verify all dates, metrics and claims.

## Project links

- AKOS product: https://github.com/rollie1212/akos-main
- Personal reference implementation: https://github.com/rollie1212/akos-new
- Live reference: https://akos-mu.vercel.app/

## License

MIT.
