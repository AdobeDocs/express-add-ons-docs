/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/express/add-ons/docs/guides/',
  siteMetadata: {    
    "home": {
      "title": "Adobe Express Add-ons",
      "path": "/express-add-ons"
    },
    pages: [      
      // {
      //   title: 'Getting Started',
      //   path: 'getting_started'
      // },
      {
        title: 'Guides',
        path: 'guides'
      },
      {
        title: 'References',
        menu: [
          {
            title: 'API Reference v1',
            description: 'API Reference v1',
            path: '/references/'
          },          
          {
            title: 'Manifest Schema',
            description: 'Manifest Schema',
            path: '/references/manifest.md'
          }
        ]
      },
      {
        "title": "Samples & Resources",
        "path": 'guides/develop/samples'
        // "path": "https://github.com/AdobeDocs/express-add-on-samples"
      },
      {
        title: 'Community',
        path: '/support/'
      }
    ],
    subPages: [ 
      {
        "title": "Getting Started",
        "path": "guides/getting_started",
        "pages": [             
          {
            "title": "Introduction",
            "path": "guides/getting_started"
          },        
          {
            "title": "Quickstart",
            "path": "guides/getting_started/quickstart.md"
          },  
          {
            "title": "Developer Tooling",
            "path": "guides/getting_started/dev_tooling.md"
          }
        ]
      },
      {
        "title": "Develop",
        "path": "guides/develop",
        "pages": [   
          {
            "title": "Using the Add-on SDK",
            "path": "guides/develop/"
          },                                             
          {
            "title": "Frameworks, Libraries and Bundling",
            "path": "guides/develop/frameworks-libraries-bundling.md"
          },
          {
            "title": "Network Requests and CORS",
            "path": "guides/develop/cors.md"
          },
          {
            "title": "Code Samples",
            "path": "guides/develop/samples"
          },
        ]
      },    
      {
        "title": "Design",
        "path": "guides/design",
        "pages": [
          {
            "title": "Add-on User Interface Guide",
            "path": "guides/design/"
          }, 
          // {
          //   "title": "Spectrum Guide",
          //   "path": "guides/design/spectrum.md"
          // },  
          {
            "title": "Best Practices",
            "path": "guides/design/best_practices.md"
          },          
        ]
      },      
      {
        "title": "Debug",
        "path": "guides/debug",
        "pages": [
          {
            "title": "Debugging Overview",
            "path": "guides/debug/"
          },  
          {
            "title": "VS Code Debugging",
            "path": "guides/debug/vs-code.md"
          },        
        ]
      },
      {
        "title": "Distribute",
        "path": "guides/distribute",
        "pages": [                      
          {
            "title": "Review Guidelines",
            "path": "guides/distribute/review_guidelines.md",
          },           
          {
            "title": "Private Add-on Distribution",
            "path": "guides/distribute/submit-private-dist.md"
          },        
          {
            "title": "Public Add-on Distribution",
            "path": "guides/distribute/submit-public-dist.md"
          },    
          // {
          //   "title": "Monetizing your Add-on",
          //   "path": "guides/distribute/monetization.md"
          // }               
        ]
      },               
      {
        "title": "References",
        "path": "guides/references",      
        pages: [
          {
            title: 'API Reference v1',
            description: 'API Reference v1',
            path: '/references/'
          },          
          {
            title: 'Manifest Schema',
            description: 'Manifest Schema',
            path: '/references/manifest.md'
          }
        ]  
      }, 
      {
        "title": "FAQ",
        "path": "guides/faq.md",        
      },      
      {
        title: 'Community',
        path: '/support/community/',
        header: true,
        pages: [
          {
            title: 'Information',
            path: '/support/community/'
          }
        ]
      }      
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
