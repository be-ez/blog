# Gatsby Contentful

## Goals
    [ ✅ ] Contentful CMS
        [✔️] Fluid Images
        [✔️] Blog Posts
        [❌] Page Layout
        [✔️] Card
        [✔️] Generic Content
        [✔️] Views
        [✔️] Subviews
        [✔️] Nav
        [✔️] Rich Text
        [❌] Fluid Images in Rich Text
        [❌] MDX Components
    [ ✅ ] Continuous Deployment
        [✔️] Dokku push
        [✔️] Contentful Change
        [✔️] Contentful Dev Site
    [ 📈 ] Simple workspace to track projects 👌
    [ 📈 ] Integration with Dokku / Heroku and/or netlify/ghpages 💸
    [ ❌ ] Support MDX and/or Vue ⚡️
    [ ❌ ] Analtyics page🔆
            [❌] Words per week 💯
            [❌] SVG Graph plugin
            [❌] Wakatime stats
    [ ❌ ] Graphs via project analytics 📈

## Dev
Run Development Server
`yarn dev`

Live Reload @ http://localhost:8000/
GraphiQL    @ http://localhost:8000/___graphql

Occationally when the content model changes it is helpful to remove the Gatsby cache
`rm -rf .cache`

### Dependencies
 `yarn` 

### Dev Server
`yarn develop`

## Deployment

### Dokku
Must be configured with dokku
`git remote add dokku xn--4qe.com:contentful`
Deploy with git
`git push dokku master`

### Local Build
`yarn build`
