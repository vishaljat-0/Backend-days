export const verificationEmailTemplate = (verificationLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#080a12;font-family:'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080a12;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0f1020,#13152a);border:1px solid rgba(124,58,237,0.2);border-radius:20px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(124,58,237,0.3),rgba(79,70,229,0.2));padding:32px;text-align:center;border-bottom:1px solid rgba(124,58,237,0.15);">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:10px;display:inline-block;vertical-align:middle;"></div>
                <span style="color:#e2e8f0;font-size:20px;font-weight:700;vertical-align:middle;letter-spacing:-0.5px;">Perplexity AI</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px;">
              <h1 style="color:#e2e8f0;font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.3px;">Verify your email</h1>
              <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 28px;">
                Thanks for signing up! Click the button below to verify your email address and get started.
              </p>

              <!-- Button -->
              <a href="${verificationLink}" 
                style="display:block;text-align:center;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:600;letter-spacing:0.2px;margin-bottom:28px;">
                Verify Email Address →
              </a>

              
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px 28px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="color:#334155;font-size:11px;margin:0;">
                This link expires in 24 hours · If you didn't sign up, ignore this email.
              </p>
              <p style="color:#1e293b;font-size:11px;margin:8px 0 0;">
                Made by Vishal with ❤
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;