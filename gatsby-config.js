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
  pathPrefix: process.env.PATH_PREFIX || '/express/add-ons/docs/',
  siteMetadata: {    
    pages: [    
      {
        title: 'Adobe Express Add-ons',
        path: 'https://developer.adobe.com/express/add-ons',
      },              
      {
        title: 'Guides',
        path: 'guides'
      },
      {
        title: 'SDK References',
        path: 'references'        
      },
      {
        title: "Samples & Resources",
        path: 'samples'       
      },      
    ],    
    subPages: [
      {
        title: 'Overview',
        path: 'samples/samples.md'     
      },
      {
        title: 'Resources',
        path: 'samples/resources/'
      },    
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
              "title": "currentUser",
              "path": "references/addonsdk/app-currentUser.md"
            },  
            {
              "title": "devFlags",
              "path": "references/addonsdk/app-devFlags.md"
            },                                                                                                                 
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
            "path": "references/scriptruntime/web/",  
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
            "title": "Overview",
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
            "title": "Overview",
            "path": "guides/design/"
          }, 
          {
            "title": "User interface guide",
            "path": "guides/design/user_interface.md"
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
        "path": "guides/develop/",
        "pages": [   
          {
            "title": "Overview",
            "path": "guides/develop/",
          },
          {
            "title": "Implementing Common Use Cases",
            "path": "guides/develop/use_cases.md"
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
            "title": "Add-on iframe Context",
            "path": "guides/develop/context.md"
          },          
        ]
      },          
      {
        "title": "Debug",
        "path": "guides/debug",
        "pages": [
          {
            "title": "Overview",
            "path": "guides/debug/"
          },
          {
            "title": "Browser debugging",
            "path": "guides/debug/browser.md"
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
            "title": "Overview",
            "path": "guides/distribute/"
          },                                              
          {
            "title": "Our review process",
            "path": "guides/distribute/review_process/",                                             
          },                    
          {
            "title": "Private distribution",
            "path": "guides/distribute/private-dist.md"
          },        
          {
            "title": "Public distribution",
            "path": "guides/distribute/public-dist.md"
          },
          {
            "title": "Guidelines and requirements",            
            "path": "guides/distribute/guidelines/general",            
            "pages": [ 
              {
                "title": "General guidelines",            
                "path": "guides/distribute/guidelines/general",                          
                "pages": [ 
                  {
                    "title": "Content",
                    "path": "guides/distribute/guidelines/general/content/index.md",
                    // "pages": [  
                    //   {
                    //     "title": "Unacceptable & Restricted Content",
                    //     "path": "guides/distribute/guidelines/general/content/unacceptable.md"
                    //   },
                    // ]
                  },                  
                  {
                    "title": "User interface",
                    "path": "guides/distribute/guidelines/general/user_interface.md"
                  }, 
                  {
                    "title": "Listing your add-on",
                    "path": "guides/distribute/guidelines/general/listing.md"
                  },
                  {
                    "title": "Publisher profile",
                    "path": "guides/distribute/guidelines/general/pub_profile.md"
                  },                 
                  {                
                    "title": "Functionality & testing",
                    "path": "guides/distribute/guidelines/general/perf_functionality_security",
                    "pages": [                        
                      {
                        "title": "Compatibility",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/compatibility.md"
                      },
                      {
                        "title": "Authenticating users",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/auth.md"
                      },
                      {
                        "title": "Features",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/features.md"
                      }, 
                      {
                        "title": "Performance",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/performance.md"
                      },
                      {
                        "title": "Accessibility",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/accessibility.md"
                      },
                      {
                        "title": "Security",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/security.md"
                      },          
                      {
                        "title": "Usability",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/usability.md"
                      },
                      {
                        "title": "Edge cases",
                        "path": "guides/distribute/guidelines/general/perf_functionality_security/edge_case.md"
                      },       
                    ],                                       
                  }, 
                ],
              },                            
              {
                "title": "Brand guidelines",
                "path": "guides/distribute/guidelines/brand_guidelines.md"
              },               
              {
                "title": "Monetization guidelines",
                "path": "guides/distribute/guidelines/monetization.md"
              },                                                     
              
              {
                "title": "Generative AI guidelines",
                "path": "guides/distribute/guidelines/genai/",
                "pages": [
                  {                  
                    "title": "Restrictions",
                    "path": "guides/distribute/guidelines/genai/restrictions"                    
                  },
                  {                  
                    "title": "Requirements",
                    "path": "guides/distribute/guidelines/genai/requirements"                    
                  },
                  {                  
                    "title": "Guidelines",
                    "path": "guides/distribute/guidelines/genai/guidelines"                    
                }
                ]
              },                             
            ],
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
