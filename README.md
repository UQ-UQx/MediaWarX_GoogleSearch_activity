# MediaWarX Google Search Activity
Google Search activity


## Get Started 

### Step 1)

Ensure that you have apache running on port 80, I recommend using MAMP/WAMP 🐘 or equivalent for a GUI interface

This is necessary as BrowserSyncPlugin proxy setting lets you use existing Apache virtual host for API.

### Step 2) 🎨 🖌️

Install dependencies 

```
npm install
```
Start webpack watch by using -

```
npm start
```
### Step 3)

Copy config.php.example as config.php and enter your config details.



Replace "**API_KEY**" with your own google maps api key, you will need to replace this in -

public/index.php

src/components/GoogleSearchUploadFormPage.js
src/components/LocationInput.js


### Step 4) 🖼️

Everything should be awesome right now... so start creating your awesome app. 


## Optional

#### JQuery -

You will notice that i've commented out JQuery inside webpack's provider plugin. If you want to use it for any reason you can uncomment and run -
```
npm start
```
to restart webpack. 

#### BundleAnalyzerPlugin -

I've commented this out inside webpack.config as you only need to use it when you're mostly done with your app, this is mainly for optimising your code. 
