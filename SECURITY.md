# Security Policy

## API Key Storage

Astro Deck stores API keys in **browser localStorage**. This is a client-side only solution with specific security implications.

### What localStorage means

```
Your Browser
└── localStorage (per domain)
    └── gemini_api_key: "AIza..."
```

- Data persists until manually cleared
- Accessible only from same origin (domain + port)
- NOT sent to server automatically
- NOT encrypted

### Threat Model

| Threat | Risk Level | Mitigation |
|--------|------------|------------|
| Malicious browser extension | 🔴 High | Audit extensions, use separate profile |
| XSS on your site | 🔴 High | Keep dependencies updated, CSP headers |
| Network interception | 🟢 Low | HTTPS encrypts API calls |
| Server breach | 🟢 None | Keys never touch server |
| Git exposure | 🟢 None | Keys not in codebase |

### Browser Extension Risks

Extensions with these permissions can read your localStorage:

- `storage` - Direct access to browser storage
- `tabs` + `activeTab` - Can inject scripts
- `<all_urls>` - Access to all websites

**Recommendation:** Review extensions at `chrome://extensions` and remove untrusted ones.

### Safe Practices

1. **Use a dedicated browser profile** for development
   ```
   Chrome → Profile → Add → "Development"
   ```

2. **Restrict your API key** in Google Cloud Console
   - Set HTTP referrer restrictions
   - Set API quota limits

3. **Rotate keys periodically**
   - Generate new key monthly
   - Revoke old keys immediately

4. **Monitor API usage**
   - Check Google AI Studio dashboard
   - Set up billing alerts

### Alternative: Session-only Storage

If you prefer keys to not persist, modify the code to use `sessionStorage`:

```js
// Keys cleared when browser closes
sessionStorage.setItem('gemini_api_key', key);
```

### For Production Deployment

If exposing admin to the internet:

1. **Add authentication** (e.g., Astro middleware)
2. **Move API calls server-side** (API routes)
3. **Use environment variables** for keys
4. **Add rate limiting**

## Reporting Vulnerabilities

If you discover a security issue, please email security@sandikodev.com or open a private security advisory on GitHub.

Do NOT open public issues for security vulnerabilities.
