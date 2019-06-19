let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}


if ( process.env.CONTENTFUL_DEV ) {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || contentfulConfig.accessToken,
    host: "preview.contentful.com"
  }
  console.log("CONTENTFUL DEV")
} else {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
  }
}
const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}
const { BLOCKS } = require('@contentful/rich-text-types')
module.exports = {
  siteMetadata: {
    title: 'd(^_^)b',
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `d(^_^)b`,
        short_name: `ᗲ`,
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#a2466c`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon-152x152.png`, // This path is relative to the root of the site.
        include_favicon: true, // Include favicon
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID || "UA-134590739-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "xn--4qe.com",
      },
    },
    'gatsby-transformer-remark',
     {
      resolve: `gatsby-mdx`,
      options: {
        // extensions: ['.mdx'],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    },
    {
      resolve: `@contentful/gatsby-transformer-contentful-richtext`,
      options: {
        renderOptions: {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: node => {
              if (node.data.target.fields.file['en-US'].contentType == 'video/quicktime'){
                // Return video tag for .mov
                return `<video  type="video/quicktime" autoplay muted loop src="${node.data.target.fields.file['en-US'].url}" />`
              } else if (node.data.target.fields.file['en-US'].contentType == 'video/mp4'){
                // return video tag for mp4
                return `<video type="video/mp4" autoplay muted loop src="${node.data.target.fields.file['en-US'].url}" />`
              } else {
                return `<img src="${node.data.target.fields.file['en-US'].url}" />`
              }
            }
          },
        },
      },
    }
  ],
}
