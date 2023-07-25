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
  //pathPrefix: process.env.PATH_PREFIX || '/express/add-ons/docs/',
  pathPrefix: process.env.PATH_PREFIX || '/express-add-ons/docs/',
  siteMetadata: {    
    home: {
      "title": "Adobe Express Add-ons",
      "path": "/express-add-ons",
      //"path": "https://developer-stage.adobe.com/express/add-ons"
    },
    pages: [                  
      {
        title: 'Guides',
        path: 'guides'
      },
      {
        title: 'SDK References',
        path: 'references'        
      },
      {
        "title": "Samples & Resources",
        "path": 'samples'        
      },      
    ],
    subPages: [  
    {
      title: 'Overview',
      path: 'references/'
    },      
    {              
      title: 'AddOnSdk',                
      path: 'references/addonsdk/',            
      pages: [                                                                                                                
        {
          "title": "app",
          "path": "references/addonsdk/addonsdk-app.md",
          pages: [                                                                                                                    
            {
              "title": "document",
              "path": "references/addonsdk/app-document.md"
            },
            {
              "title": "oauth",
              "path": "references/addonsdk/app-oauth.md"
            },
            {
              "title": "ui",
              "path": "references/addonsdk/app-ui.md"
            },
          ]
        },                                  
        {
          "title": "instance",
          "path": "references/addonsdk/addonsdk-instance.md",
           pages: [                                                                                                                    
            {
              "title": "clientStorage",
              "path": "references/addonsdk/instance-clientStorage.md"
            },
            {
              "title": "manifest",
              "path": "references/addonsdk/instance-manifest.md"
            },
            {
              "title": "runtime",
              "path": "references/addonsdk/instance-runtime.md",
               pages: [                                                                                                                    
                {
                  "title": "dialog",
                  "path": "references/addonsdk/runtime-dialog.md"
                }
              ]
            },
          ]
        },
        {
          "title": "constants",
          "path": "references/addonsdk/addonsdk-constants.md"
        },

      ]          
      },
      {              
        title: 'Script Runtime',                
        path: 'references/scriptruntime/',   
        pages: [                                                                                                                
          {
            "title": "Communication APIs",
            "path": "references/scriptruntime/communication/",  
          },
          {
            "title": "Web APIs",
            "path": "references/scriptruntime/common/",  
          },
          {
            "title": "Editor APIs",            
            "path": "references/scriptruntime/editor/",  
          }
        ]
      },      
      {
        title: 'Manifest Schema',
        description: 'Manifest schema',
        path: 'references/manifest'
      },  
      {
        title: 'Changelog',            
        path: 'references/changelog.md'
      },            
      {
        title: 'Overview',
        path: 'guides/'
      },  
      {
        "title": "Getting started",
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
            "title": "Development tools",
            "path": "guides/getting_started/dev_tooling.md"
          },
          // {
          //   "title": "Web Programming Essentials",
          //   "path": "guides/getting_started/web-programming.md"
          // },    
        ]
      },
      {
        "title": "Design",
        "path": "guides/design",
        "pages": [
          {
            "title": "User interface guide",
            "path": "guides/design/"
          }, 
          // {
          //   "title": "TEST",
          //   "path": "guides/design/test.md"
          // },  
          // {
          //   "title": "Spectrum usage guide",
          //   "path": "guides/design/spectrum.md"
          // },            
          {
            "title": "Best practices",
            "path": "guides/design/best_practices.md"
          },          
        ]
      },      
      {
        "title": "Develop",
        "path": "guides/develop/index.md",
        "pages": [   
          {
            "title": "Implementing Common Use Cases",
            "path": "guides/develop/index.md"
          },                                             
          {
            "title": "Frameworks, libraries and bundling",
            "path": "guides/develop/frameworks-libraries-bundling.md"
          },
          {
            "title": "Performance Tips",
            "path": "guides/develop/performance.md"
          },            
          {
            "title": "Network requests and CORS",
            "path": "guides/develop/cors.md"
          },          
        ]
      },          
      {
        "title": "Debug",
        "path": "guides/debug",
        "pages": [
          {
            "title": "Browser debugging",
            "path": "guides/debug/"
          },  
          {
            "title": "VS Code debugging",
            "path": "guides/debug/vs-code.md"
          },        
        ]
      },
      {
        "title": "Distribute",
        "path": "guides/distribute",
        "pages": [                      
          {
            "title": "Review guidelines",
            "path": "guides/distribute/review_guidelines.md",
          },           
          {
            "title": "Private distribution",
            "path": "guides/distribute/private-dist.md"
          },        
          {
            "title": "Public distribution",
            "path": "guides/distribute/public-dist.md"
          },                           
        ]
      }, 
      {
        "title": "FAQs",
        "path": "guides/faq.md"        
      },              
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
