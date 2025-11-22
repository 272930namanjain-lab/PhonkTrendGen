# Google AdMob Setup Guide for PhonkGen

Your app is now published with Google AdMob integration! Follow these steps to start earning money:

## Step 1: Create Google AdMob Account
1. Go to https://admob.google.com
2. Sign in with your Google account (or create one)
3. Click "Start Now" and follow the setup wizard

## Step 2: Get Your Publisher ID
1. In AdMob console, go to Settings > Account Information
2. Copy your Publisher ID (looks like: `ca-pub-xxxxxxxxxxxxxxxx`)

## Step 3: Create Ad Units
1. In AdMob console, click "Apps" → "Add App"
2. Select your platform (Web)
3. Create ad units and get their Ad Unit IDs

## Step 4: Update Your App
1. In your published app, find these files:
   - `client/src/components/ad-banner.tsx`
   - `client/index.html`

2. Replace the placeholders:
   ```
   ca-pub-xxxxxxxxxxxxxxxx → Your actual Publisher ID
   data-ad-slot="xxxxxxxxxxxxxxxx" → Your Ad Unit ID
   ```

## Step 5: How It Works After Publication
- **Automatic Earnings**: Every time a user clicks an ad or views it, you earn money
- **Real-time Tracking**: Monitor earnings in AdMob dashboard
- **Payment**: Google pays you monthly (minimum $100 balance)
- **No Approval Needed**: Your ads start showing immediately after setup

## Step 6: Best Practices
- ✅ Place ads between content sections (we did this!)
- ✅ Never click your own ads
- ✅ Don't encourage users to click ads
- ✅ Keep your app quality high
- ✅ Monitor performance in AdMob dashboard

## FAQ

**Q: Can I earn money immediately?**
A: Yes! Once you add your Publisher ID and Ad Unit IDs, ads will show and you can earn.

**Q: How much can I earn?**
A: Depends on traffic and user engagement. Most apps earn $0.50-$5 per 1000 impressions.

**Q: Can I change ad placements after publication?**
A: Yes, update the code and redeploy your app on Replit.

**Q: What if I don't see ads?**
A: Make sure you've added your correct Publisher ID and Ad Unit IDs.

## Support
- Google AdMob Help: https://support.google.com/admob
- Replit Docs: https://docs.replit.com
