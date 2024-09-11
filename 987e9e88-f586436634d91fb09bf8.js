"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[5298],{18356:function(e,t,l){l.d(t,{i:function(){return I}});var n=l(54705),o=l(54506),a=l(88763),i=l(94760),s=l(46942),r=l.n(s),d=l(35413),c=l(71052),u=l(25013),p=l(88790),m=l(52359),f=l(68623),g=l(76944),v=l(3322),h=l(36002),w=l(73193),y=l(7256),b=l(94087),C=l(19243),O=l(2047),Y=l(99744),S=l(3823);function D(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function x(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?D(Object(l),!0).forEach((function(t){(0,n.A)(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):D(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}const A=/^(?=[A-Za-z0-9\s]{6,}$)[A-Za-z0-9\s]*$/;var j={name:"14s3c4g",styles:"display:flex;gap:32px;width:100%;flex-direction:column"},k={name:"h8f25w",styles:"color:var(--spectrum-global-color-gray-800);display:inline-flex"},P={name:"budh8k",styles:"display:flex;flex-direction:column;gap:16px"},N={name:"6apepd",styles:"display:flex;flex-direction:column;gap:48px"};const I=e=>{var t,l;let{showCreateForm:n,setShowCreateForm:s,isCreateNewCredential:D,setIsCreateNewCredential:F,setIsPrevious:T,formData:z,setFormData:E}=e;const{getCredentialData:_}=(0,a.useContext)(S.A),H=_,{0:L,1:q}=(0,a.useState)(!1),{0:B,1:M}=(0,a.useState)(!1),{0:U,1:V}=(0,a.useState)({}),{0:$,1:R}=(0,a.useState)(""),{0:X,1:J}=(0,a.useState)(!1),{0:Z,1:W}=(0,a.useState)([]),{0:G,1:K}=(0,a.useState)(!1),{0:Q,1:ee}=(0,a.useState)(!1),{0:te,1:le}=(0,a.useState)(!1),{0:ne,1:oe}=(0,a.useState)(!1),{0:ae,1:ie}=(0,a.useState)(),{selectedOrganization:se,template:re,previousProjectDetail:de}=(0,a.useContext)(S.A),ce=null==H?void 0:H[I],ue=null==ce||null===(t=ce.children)||void 0===t?void 0:t.filter((e=>Object.keys(e.props).some((e=>e.startsWith("contextHelp")))));(0,a.useEffect)((()=>{var e;null!==(e=window.adobeIMS)&&void 0!==e&&e.isSignedInUser()?setTimeout((()=>{q(!1)}),1e3):q(!0)}),[null===(l=window.adobeIMS)||void 0===l?void 0:l.isSignedInUser()]),(0,a.useEffect)((()=>{n&&M(!1)}),[n]),(0,a.useEffect)((()=>{(()=>{const e={},t={label:"Language",selectOptions:[]},l={label:"products",productList:[]};null==ce||ce.children.forEach((n=>{let{type:a,props:i}=n;var s,r;a===f.o&&null!=i&&i.children&&(t.required=i.required||!1,(s=t.selectOptions).push.apply(s,(0,o.A)([].concat(i.children).map((e=>{let{props:{title:t,href:l}}=e;return{title:t,href:l}})))),E((e=>{var t,l;return x(x({},e),Array.isArray(i.children)?null:{Download:null===(t=i.children)||void 0===t||null===(l=t.props)||void 0===l?void 0:l.title})}))),a===O.lk&&null!=i&&i.children&&(r=l.productList).push.apply(r,(0,o.A)([].concat(i.children).map((e=>{let{props:{label:t,icon:l}}=e;return{label:t,icon:l}})))),e[a]=x(x({},i),{},{required:a===p.X||(null==i?void 0:i.required)})})),t.selectOptions.length&&(e[g.f]=t,1===t.selectOptions.length&&E((e=>{var l,n;return x(x({},e),{},{Download:null===(l=t.selectOptions[0])||void 0===l?void 0:l.title,zipUrl:null===(n=t.selectOptions[0])||void 0===n?void 0:n.href})}))),null!=l&&l.productList.length&&(e[O.Yt]=l);const n=!(null==de||!de.count);ee(!!n),W(e)})()}),[]),(0,a.useEffect)((()=>{const e=A.test(z.CredentialName),t=ce.children.some((e=>e.type===m.o));let l;t?z.AllowedOrigins&&(l=(0,c.$p)(z.AllowedOrigins)):l=!0,ie(l);const n=e&&(!t||l)&&!0===z.Agree;K(n)}),[z]);const pe=(e,t)=>{let l;if(l="Download"===t?e.title:"Downloads"===t||"Agree"===t?e.target.checked:e.target.value,E((e=>x(x({},e),{},{[t]:l}))),"Downloads"===t&&pe(null==he?void 0:he.selectOptions[0],"Download"),"Download"===t){var n;const e=null==Z||null===(n=Z[g.f])||void 0===n?void 0:n.selectOptions.find((e=>e.title===l));e&&E((t=>x(x({},t),{},{zipUrl:e.href})))}};(0,a.useEffect)((()=>{Q&&(T(!0),s(!0))}),[Q]);const me=null==Z?void 0:Z[u.D],fe=null==Z?void 0:Z[p.X],ge=null==Z?void 0:Z[m.o],ve=null==Z?void 0:Z[f.o],he=null==Z?void 0:Z[g.f],we=null==Z?void 0:Z[O.lk],ye=null==Z?void 0:Z[O.Yt],be=null==Z?void 0:Z[h.R];return(0,i.Y)(a.default.Fragment,null,n&&!L&&(0,i.Y)("div",{className:r()(null==ce?void 0:ce.className),css:N,"data-cy":"credential-form"},(0,i.Y)("div",{css:(0,i.AH)("display:flex;flex-direction:column;gap:48px;color:var(--spectrum-global-color-gray-800);width:100%;height:100%;text-align:left;@media screen and (min-width: ",c.jd,") and (max-width: ",c.cp,"){padding:0;width:100%;}","")},(0,i.Y)("div",{css:P},(null==ce?void 0:ce.title)&&(0,i.Y)("h3",{className:"spectrum-Heading spectrum-Heading--sizeL"},null==ce?void 0:ce.title),(null==ce?void 0:ce.paragraph)&&(0,i.Y)("p",{className:"spectrum-Body spectrum-Body--sizeL"},null==ce?void 0:ce.paragraph),(0,i.Y)("p",{className:"spectrum-Body spectrum-Body--sizeS",css:k,onClick:()=>le(!0)},"developer"===se.type?"You're creating this credential in your personal developer organization":(0,i.Y)(a.default.Fragment,null,"You're creating this credential in [",(0,i.Y)("b",null,null==se?void 0:se.name),"]."),(0,i.Y)(Y.y,{isShow:te,setIsShow:le})))),(0,i.Y)("div",{css:(0,i.AH)("display:flex;gap:35px;@media screen and (min-width: ",c.jd,") and (max-width: ",c.cp,"){flex-direction:column;padding-left:0;}","")},(0,i.Y)("div",{css:(0,i.AH)("display:flex;flex-direction:column;gap:35px;width:50%;@media screen and (min-width: ",c.jd,") and (max-width: ",c.cp,"){width:100%;}","")},(0,i.Y)("div",{css:j},fe&&(0,i.Y)(p.X,{nameProps:fe,isFormValue:ue,formData:z,handleChange:pe}),ge&&(0,i.Y)(m.o,{originsProps:ge,isFormValue:ue,formData:z,handleChange:pe,isAllowedOriginsValid:ae}),ve&&he&&(0,i.Y)(f.o,{downloadsProp:ve,type:"Downloads",formData:z,handleChange:pe}),z.Downloads&&he&&(0,i.Y)(g.f,{downloadProp:he,isFormValue:ue,handleChange:pe}),(0,i.Y)(O.lk,{products:we,product:ye}),be&&(0,i.Y)(h.R,{formData:z,adobeDeveloperConsole:be,handleChange:pe}),(0,i.Y)(w.e,{createCredential:async()=>{var e,t;const l=null===(e=window.adobeIMS)||void 0===e||null===(t=e.getTokenFromStorage())||void 0===t?void 0:t.token;l||console.log("User not logged in"),q(!0),s(!1);const n=re.apis.map((e=>({code:e.code,credentialType:e.credentialType,flowType:e.flowType,licenseConfigs:Array.isArray(e.licenseConfigs)&&e.licenseConfigs.length>0?[x(x({},e.licenseConfigs[0]),{},{op:"add"})]:[]}))),o={projectName:z.CredentialName,description:"created for get credential",metadata:{domain:z.AllowedOrigins},orgId:se.code,apis:n};try{var a,i,r;const e=`/templates/install/${re.id}`,t=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`,"x-api-key":null===(a=window)||void 0===a||null===(i=a.adobeIMS)||void 0===i||null===(r=i.adobeIdData)||void 0===r?void 0:r.client_id,Accept:"application/json"},body:JSON.stringify(o)}),n=await(null==t?void 0:t.json());if(t.ok)V(n),J(!0),oe(!0),q(!1);else{const e=n.errors[0].message.match(/\((\{.*\})\)/)[1],t=JSON.parse(e);d=t.messages[0].message,q(!1),oe(!0),K(!1),R(d),s(!0),M(!0)}}catch(c){s(!0),q(!1),oe(!0),R(c.message),M(!0)}var d},isValid:G,setIsCreateNewCredential:F,isCreateNewCredential:D}))),me?(0,i.Y)(v.T,{sideContent:null==me?void 0:me.children,SideComp:u.D}):null)),ne&&(0,i.Y)(a.default.Fragment,null,(0,i.Y)(d.y,{customDisableFunction:oe,message:n&&!X?$:!B&&X&&"Your credentials were created successfully.",variant:B||n&&!X?"error":"success",disable:5e3})),L&&!X&&!B&&!n&&(0,i.Y)(b.R,{credentials:ce,isCreateCredential:!0,downloadStatus:z.Downloads}),B&&!n&&!X&&(0,i.Y)(C.T,{errorMessage:null==H?void 0:H[C.T]}),X&&!n&&(0,i.Y)(y.q,{response:U,formData:z,handleRestart:()=>{s(!0),J(!1),F(!0),ee(!0),E({})}}))}}}]);
//# sourceMappingURL=987e9e88-f586436634d91fb09bf8.js.map