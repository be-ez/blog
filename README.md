# Gatsby Contentful

## Goals
    [ ✅ ] Contentful CMS
        [✔️] Blog Posts
        [❌] Page Layout
        [❌] Nav
        [❌] MDX Components?

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