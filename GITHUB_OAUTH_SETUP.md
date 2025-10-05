# GitHub OAuth Setup Guide

This application uses GitHub OAuth for authentication. Follow these steps to configure it:

## 1. Create a GitHub OAuth App

1. Go to GitHub Settings: https://github.com/settings/developers
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**
4. Fill in the application details:
   - **Application name**: `Inventory Management System` (or any name you prefer)
   - **Homepage URL**: `http://localhost:8080`
   - **Authorization callback URL**: `http://localhost:8080/login/oauth2/code/github`
5. Click **"Register application"**

## 2. Get Client ID and Client Secret

After creating the OAuth app:

1. You'll see your **Client ID** on the app page
2. Click **"Generate a new client secret"** to get your **Client Secret**
3. **Important**: Copy both values immediately - you won't be able to see the client secret again!

## 3. Configure the Application

You have two options to configure the OAuth credentials:

### Option A: Environment Variables (Recommended for security)

Set environment variables before running the application:

**Linux/Mac:**
```bash
export GITHUB_CLIENT_ID=your-actual-client-id
export GITHUB_CLIENT_SECRET=your-actual-client-secret
mvn spring-boot:run
```

**Windows (PowerShell):**
```powershell
$env:GITHUB_CLIENT_ID="your-actual-client-id"
$env:GITHUB_CLIENT_SECRET="your-actual-client-secret"
mvn spring-boot:run
```

**Windows (Command Prompt):**
```cmd
set GITHUB_CLIENT_ID=your-actual-client-id
set GITHUB_CLIENT_SECRET=your-actual-client-secret
mvn spring-boot:run
```

### Option B: application.yml (Not recommended for production)

Edit `src/main/resources/application.yml` and replace the placeholder values:

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: your-actual-client-id
            client-secret: your-actual-client-secret
```

**⚠️ Warning**: Never commit your actual client secret to version control!

## 4. Run the Application

```bash
mvn spring-boot:run
```

## 5. Test the Login

1. Navigate to: http://localhost:8080
2. You'll be redirected to the login page
3. Click **"Sign in with GitHub"**
4. Authorize the application on GitHub
5. You'll be redirected back to the inventory management system

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the callback URL in your GitHub OAuth app settings is exactly: `http://localhost:8080/login/oauth2/code/github`

### Error: "invalid_client"
- Verify your Client ID and Client Secret are correct
- Make sure there are no extra spaces in the values

### Application won't start
- Check that you've set the environment variables correctly
- Verify the application.yml syntax is correct if you edited it manually

## Production Deployment

When deploying to production:

1. Create a new GitHub OAuth App with your production URLs
2. Update the **Homepage URL** to your production domain
3. Update the **Authorization callback URL** to: `https://yourdomain.com/login/oauth2/code/github`
4. Use environment variables or a secure secrets management system
5. **Never** hardcode credentials in application.yml
