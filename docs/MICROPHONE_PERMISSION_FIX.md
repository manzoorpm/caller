# Fixing Microphone Permission Error

## The Error

```
PermissionDeniedError (31401): The browser or end-user denied permissions to user media.
Therefore we were unable to acquire input audio.
```

## What This Means

✅ **Good News**: Twilio is connecting successfully! The JWT error is fixed.

❌ **Issue**: Your browser is blocking microphone access.

## Solution by Browser

### Chrome / Edge

1. **Look for the camera/microphone icon** in the address bar (right side)
2. Click it
3. Select **"Allow"** for microphone
4. Refresh the page

**OR manually:**

1. Click the **lock icon** or **site settings** in address bar
2. Go to **Site settings**
3. Find **Microphone**
4. Change to **"Allow"**
5. Refresh the page

**OR via Chrome settings:**

1. Go to: `chrome://settings/content/microphone`
2. Make sure microphone access is **not blocked**
3. Add `http://localhost:3000` to **"Allowed to use your microphone"**
4. Refresh the page

### Firefox

1. Click the **microphone icon** in the address bar
2. Click the **X** to remove the block
3. Refresh the page
4. Firefox will ask for permission again - click **"Allow"**

**OR:**

1. Click the **lock icon** in address bar
2. Click **"Clear Permission"** for microphone
3. Refresh and allow when prompted

### Safari

1. Go to **Safari** menu → **Settings for This Website**
2. Find **Microphone** dropdown
3. Change to **"Allow"**
4. Refresh the page

**OR:**

1. Go to **Safari** menu → **Preferences**
2. Click **Websites** tab
3. Select **Microphone** in the left sidebar
4. Find `localhost` and set to **"Allow"**

## Testing

After granting permission:

1. Refresh http://localhost:3000/test
2. Browser should show a microphone permission prompt
3. Click **"Allow"**
4. You should see: **"✓ Twilio Connected"** (green)
5. Try making a test call

## Troubleshooting

### Still Not Working?

1. **Check System Permissions:**
   - **Mac**: System Settings → Privacy & Security → Microphone
   - **Windows**: Settings → Privacy → Microphone
   - Make sure your browser has permission at the OS level

2. **Try a Different Browser:**
   - Chrome usually works best with WebRTC
   - Test in incognito/private mode

3. **Check Microphone Hardware:**
   - Make sure your microphone is connected
   - Test it in another app (e.g., Voice Recorder)

4. **Restart Browser:**
   - Close all browser windows
   - Reopen and try again

### Browser Console Check

Open browser console (F12) and run:

```javascript
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(() => console.log("✓ Microphone access granted"))
  .catch((err) => console.error("✗ Error:", err.message));
```

This will tell you if the browser can access your microphone.

## HTTPS Requirement (Production)

**Important for Production:**

- Microphone access requires **HTTPS** (not HTTP)
- `localhost` is exempt from this rule (HTTP is OK for development)
- When you deploy, make sure you have SSL/HTTPS enabled

## Common Scenarios

### 1. Previously Denied Permission

If you accidentally clicked "Block" before:

- Clear the site data and permissions
- Refresh the page
- Click "Allow" when prompted

### 2. Corporate/School Network

Some networks block microphone access:

- Try a different network
- Use a personal hotspot
- Contact your IT department

### 3. Browser Extensions

Ad blockers or privacy extensions may block microphone:

- Disable extensions temporarily
- Add localhost to extension whitelist

## Success Indicators

When everything is working:

1. ✅ Green "Twilio Connected" status
2. ✅ No errors in browser console
3. ✅ Microphone icon shows in browser tab
4. ✅ Can enter phone numbers and click "Call"

## Next Steps

Once microphone permission is granted:

1. Test making a call to a verified number
2. Test the mute button
3. Test the dial pad during a call
4. Set up ngrok for production testing (see TWILIO_SETUP.md)
