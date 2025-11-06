# Chrome Microphone Permission - Manual Fix

## Problem

Chrome isn't showing the microphone permission prompt, giving error:

```
PermissionDeniedError (31401): The browser or end-user denied permissions to user media.
```

## Solution - Step by Step

### Method 1: Check Chrome Settings (Fastest)

1. **Open Chrome Settings:**
   - Go to: `chrome://settings/content/microphone`
   - OR click the three dots (⋮) → Settings → Privacy and security → Site settings → Microphone

2. **Check blocked sites:**
   - Look for `http://localhost:3000` in the "Not allowed to use your microphone" section
   - If you see it, click the trash icon (🗑️) to remove it

3. **Add to allowed:**
   - Click **"Add"** next to "Allowed to use your microphone"
   - Enter: `http://localhost:3000`
   - Click **"Add"**

4. **Refresh the page** at http://localhost:3000/test

### Method 2: Address Bar Settings

1. **Look at the address bar** (left side of `http://localhost:3000/test`)
2. You might see:
   - 🎤 with a red X - microphone blocked
   - 🔒 lock icon
   - ℹ️ info icon

3. **Click the icon** → Site settings
4. Find **Microphone** dropdown
5. Change from "Block" to **"Allow"**
6. Refresh the page

### Method 3: Clear Site Data & Retry

1. Open Chrome DevTools (F12 or right-click → Inspect)
2. Go to **Application** tab
3. In the left sidebar, find **Storage**
4. Click **"Clear site data"**
5. Close and reopen the browser
6. Go back to http://localhost:3000/test
7. Chrome should now show the permission prompt

### Method 4: Test Microphone Access Directly

1. Open Chrome DevTools (F12)
2. Go to **Console** tab
3. Paste this code and press Enter:

```javascript
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    console.log("✓ Microphone access GRANTED!");
    stream.getTracks().forEach((track) => track.stop());
    alert("Microphone works! Now refresh the page.");
  })
  .catch((err) => {
    console.error("✗ Microphone access DENIED:", err);
    alert("Microphone blocked: " + err.message);
  });
```

4. If Chrome shows a permission prompt → Click **"Allow"**
5. If you see "✓ Microphone access GRANTED!" → **Refresh the page**
6. If you see an error → Continue to next method

### Method 5: Check System Permissions (Mac)

1. Open **System Settings** (or System Preferences)
2. Go to **Privacy & Security**
3. Click **Microphone** in the left sidebar
4. Make sure **Google Chrome** is checked ✓
5. If it's not there, Chrome hasn't requested permission yet
6. Restart Chrome and try again

### Method 6: Check System Permissions (Windows)

1. Open **Settings**
2. Go to **Privacy** → **Microphone**
3. Make sure "Allow apps to access your microphone" is **On**
4. Scroll down and make sure **Google Chrome** is allowed
5. Restart Chrome and try again

### Method 7: Reset Chrome Permissions

If nothing works, reset all Chrome permissions:

1. Go to: `chrome://settings/content`
2. Click **Microphone**
3. Click **"Clear permissions and reset settings"**
4. Restart Chrome
5. Go to http://localhost:3000/test
6. It should now prompt for permission

### Method 8: Try Incognito Mode

1. Open Chrome **Incognito window** (Ctrl+Shift+N or Cmd+Shift+N)
2. Go to: http://localhost:3000/test
3. Chrome should show permission prompt
4. Click **"Allow"**
5. If it works in incognito, your regular Chrome has a permission block

## Verification Steps

After granting permission, you should see:

1. ✅ **Microphone icon** appears in the browser tab
2. ✅ **Green "✓ Twilio Connected"** status in the app
3. ✅ **No errors** in Chrome Console (F12 → Console tab)
4. ✅ **Dial pad is enabled** and clickable

## Common Issues

### "Microphone not found"

- Check if microphone is plugged in
- Try selecting a different microphone in Chrome settings
- Test microphone in another app (e.g., Zoom, Skype)

### "Permission denied by system"

- Check system-level microphone permissions (see Methods 5 & 6)
- Some antivirus software blocks microphone access

### "Microphone in use"

- Close other apps using the microphone (Zoom, Discord, etc.)
- Restart Chrome

## Still Not Working?

If you've tried everything and it still doesn't work:

1. **Check Chrome version:**
   - Go to: `chrome://settings/help`
   - Update if needed

2. **Try a different browser:**
   - Firefox: http://localhost:3000/test
   - Edge: http://localhost:3000/test

3. **Check for browser extensions:**
   - Disable ad blockers or privacy extensions
   - Test in incognito mode (extensions disabled by default)

## Success!

Once microphone permission is granted:

1. You'll see: **"✓ Twilio Connected"** (green)
2. Enter a phone number: `+15555555555`
3. Click **"Call"**
4. Phone should ring!

## Next Steps

- See [TWILIO_SETUP.md](TWILIO_SETUP.md) for making real calls
- See [MICROPHONE_PERMISSION_FIX.md](MICROPHONE_PERMISSION_FIX.md) for other browsers
