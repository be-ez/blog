# Gatsby Contentful

## Goals
    [ 📈 ] Simple CMS workspace to create content 👌
    [ 📈 ] Push to deploy & deploy on CMS update  💸
    [ 📈 ] Re-usable web component library
    
### Roadmap

#### __[ 4/1/18 ] Base Contentful React Components__
Control UI with CMS

#### __[ 4/1/18 ] Open Source__
All secrets are removed and be-ez/blog is made public

#### __[ 4/15/18 ] Live Photo__
Single/Grid view Live Photo

#### __[ 5/1/18 ]  MDX__
Possible to write posts in MDX with either React of Vue
        
### Features
    [ ✅ ] Contentful CMS
        [ ✅ ] Fluid Images
        [ ✅ ] Blog Posts
        [ ✅ ] Card
        [ ✅ ] Generic Content
        [ ✅ ] Views
        [ ✅ ] Subviews
        [ ✅ ] Nav
        [ ✅ ] iOS Live Photos
        [ ✅ ] Rich Text
            [ ✅ ] Images
            [ ✅ ] Formatting (Bold, Header Pagebreak etc.) 
            [ ✅ ] Video
            [ ❌ ] Fluid Images in Rich Text
        [ ✅ ] Sub-View Templates
            [ ✅ ] Generic
            [ ✅ ] Blog
            [ ✅ ] Card
        [ ✅ ] Mobile
            [ ✅ ] Breakpoints
            [ ✅ ] Flexbox Grid in base layout
        [ ✅ ] Customize Layouts in View
            [ ✅ ] None
            [ ❌ ] Grid
            [ ❌ ] Lists
            [ ✅ ] Masonary
    [ ✅ ] Continuous Deployment
        [ ✅ ] Dokku push
        [ ✅ ] Contentful Change
        [ ✅ ] Contentful Dev Site
        [ ❌ ] gh-pages
        [ ❌ ] gitlab pipelines
    [ ✅ ] Support MDX and/or Vue ⚡️
        [ ✅ ] via .mdx files
        [ ❌ ] via contentful Rich Text
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
