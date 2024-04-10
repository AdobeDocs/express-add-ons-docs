"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[650],{423:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return i},default:function(){return x}});var a=t(87462),d=t(45987),m=(t(15007),t(64983)),r=t(91515);const o=["components"],i={},l={_frontmatter:i},p=r.Z;function x(e){let{components:n}=e,t=(0,d.Z)(e,o);return(0,m.mdx)(p,(0,a.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"../overview.md"},"@express-document-sdk")," / GridLayoutNode"),(0,m.mdx)("h1",{id:"class-gridlayoutnode"},"Class: GridLayoutNode"),(0,m.mdx)("p",null,"A GridLayoutNode represents a grid layout in the scenegraph. The GridLayoutNode is used to create\na layout grid that other content can be placed into."),(0,m.mdx)("h2",{id:"hierarchy"},"Hierarchy"),(0,m.mdx)("ul",null,(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("p",{parentName:"li"},(0,m.mdx)("a",{parentName:"p",href:"Node.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Node"))),(0,m.mdx)("p",{parentName:"li"},"↳ ",(0,m.mdx)("strong",{parentName:"p"},(0,m.mdx)("inlineCode",{parentName:"strong"},"GridLayoutNode"))))),(0,m.mdx)("h2",{id:"implements"},"Implements"),(0,m.mdx)("ul",null,(0,m.mdx)("li",{parentName:"ul"},(0,m.mdx)("inlineCode",{parentName:"li"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"li",href:"../interfaces/IRectangularNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"IRectangularNode")),">")),(0,m.mdx)("h2",{id:"accessors"},"Accessors"),(0,m.mdx)("h3",{id:"allchildren"},"allChildren"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"allChildren"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,m.mdx)("a",{parentName:"p",href:"Node.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Node")),">",">"),(0,m.mdx)("p",null,"Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or\nGroupNode also provide a mutable ",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md#children"},"children"),' list. Other nodes with a more specific structure can\nhold children in various discrete "slots"; this ',(0,m.mdx)("inlineCode",{parentName:"p"},"allChildren")," list includes ",(0,m.mdx)("em",{parentName:"p"},"all")," such children and reflects their\noverall display z-order."),(0,m.mdx)("p",null,"The children of a Node are always other Node classes (never the more minimal BaseNode)."),(0,m.mdx)("h4",{id:"returns"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,m.mdx)("a",{parentName:"p",href:"Node.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Node")),">",">"),(0,m.mdx)("h4",{id:"inherited-from"},"Inherited from"),(0,m.mdx)("p",null,"Node.allChildren"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"blendmode"},"blendMode"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"blendMode"),"(): ",(0,m.mdx)("a",{parentName:"p",href:"../enums/BlendMode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"BlendMode"))),(0,m.mdx)("p",null,"Blend mode determines how a node is composited onto the content below it. The default value is\n",(0,m.mdx)("a",{parentName:"p",href:"../enums/BlendMode.md#normal"},"normal")," for most nodes, and ",(0,m.mdx)("a",{parentName:"p",href:"../enums/BlendMode.md#passthrough"},"passThrough")," for GroupNodes."),(0,m.mdx)("h4",{id:"returns-1"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"../enums/BlendMode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"BlendMode"))),(0,m.mdx)("h4",{id:"inherited-from-1"},"Inherited from"),(0,m.mdx)("p",null,"Node.blendMode"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,m.mdx)("strong",{parentName:"p"},"blendMode"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"parameters"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"value")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../enums/BlendMode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"BlendMode")))))),(0,m.mdx)("h4",{id:"returns-2"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-2"},"Inherited from"),(0,m.mdx)("p",null,"Node.blendMode"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"boundsinparent"},"boundsInParent"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"boundsInParent"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,m.mdx)("p",null,"An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its\n",(0,m.mdx)("a",{parentName:"p",href:"GridLayoutNode.md#boundslocal"},"boundsLocal"),", as transformed by its position and rotation relative to the parent). If the node has\nrotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the\ntop-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined\neven for an orphan node with no parent."),(0,m.mdx)("h4",{id:"returns-3"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,m.mdx)("h4",{id:"inherited-from-3"},"Inherited from"),(0,m.mdx)("p",null,"Node.boundsInParent"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"boundslocal"},"boundsLocal"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"boundsLocal"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,m.mdx)("p",null,'The bounding box of the node, expressed in the node\'s local coordinate space (which may be shifted or rotated\nrelative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path\n"spine" of the shape as well as its stroke, but excluding effects such as shadows.'),(0,m.mdx)("p",null,"The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is\n",(0,m.mdx)("em",{parentName:"p"},"not")," necessarily (0,0) – this is especially true for Text and Path nodes."),(0,m.mdx)("h4",{id:"returns-4"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,m.mdx)("h4",{id:"inherited-from-4"},"Inherited from"),(0,m.mdx)("p",null,"Node.boundsLocal"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"centerpointlocal"},"centerPointLocal"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"centerPointLocal"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("p",null,"Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal\nbox."),(0,m.mdx)("h4",{id:"returns-5"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("h4",{id:"inherited-from-5"},"Inherited from"),(0,m.mdx)("p",null,"Node.centerPointLocal"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"fill"},"fill"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"fill"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Fill")),">"),(0,m.mdx)("h4",{id:"returns-6"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Fill")),">"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,m.mdx)("strong",{parentName:"p"},"fill"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"fill"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("p",null,"The background fill of the GridLayout."),(0,m.mdx)("h4",{id:"parameters-1"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"fill")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../interfaces/Fill.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Fill")))))),(0,m.mdx)("h4",{id:"returns-7"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"height"},"height"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"height"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("p",null,"The height of the node."),(0,m.mdx)("h4",{id:"returns-8"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("h4",{id:"implementation-of"},"Implementation of"),(0,m.mdx)("p",null,"Readonly.height"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"id"},"id"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"id"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"string")),(0,m.mdx)("p",null,"A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is\nmoved to a different part of the document."),(0,m.mdx)("h4",{id:"returns-9"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"string")),(0,m.mdx)("h4",{id:"inherited-from-6"},"Inherited from"),(0,m.mdx)("p",null,"Node.id"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"locked"},"locked"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"locked"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,m.mdx)("p",null,"The node's lock/unlock state. Locked nodes are excluded from the selection (see ",(0,m.mdx)("a",{parentName:"p",href:"Context.md#selection"},"selection"),"), and\ncannot be edited by the user unless they are unlocked first."),(0,m.mdx)("h4",{id:"returns-10"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,m.mdx)("h4",{id:"inherited-from-7"},"Inherited from"),(0,m.mdx)("p",null,"Node.locked"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,m.mdx)("strong",{parentName:"p"},"locked"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"locked"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"parameters-2"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"locked")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"boolean"))))),(0,m.mdx)("h4",{id:"returns-11"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-8"},"Inherited from"),(0,m.mdx)("p",null,"Node.locked"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"opacity"},"opacity"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"opacity"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("p",null,"The node's opacity, from 0.0 to 1.0"),(0,m.mdx)("h4",{id:"returns-12"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("h4",{id:"inherited-from-9"},"Inherited from"),(0,m.mdx)("p",null,"Node.opacity"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,m.mdx)("strong",{parentName:"p"},"opacity"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"opacity"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"parameters-3"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"opacity")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"number"))))),(0,m.mdx)("h4",{id:"returns-13"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-10"},"Inherited from"),(0,m.mdx)("p",null,"Node.opacity"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"parent"},"parent"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"parent"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,m.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,m.mdx)("p",null,"The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document\ncontent."),(0,m.mdx)("p",null,'Nodes that have been deleted are "orphaned," with a parent chain that terminates in ',(0,m.mdx)("inlineCode",{parentName:"p"},"undefined")," without reaching the\nroot node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node\nthat was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo."),(0,m.mdx)("h4",{id:"returns-14"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,m.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,m.mdx)("h4",{id:"inherited-from-11"},"Inherited from"),(0,m.mdx)("p",null,"Node.parent"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"rotation"},"rotation"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"rotation"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("p",null,"The node's local rotation angle in degrees, relative to its parent's axes. Use ",(0,m.mdx)("inlineCode",{parentName:"p"},"setRotationInParent")," to\nchange rotation by rotating around a defined centerpoint."),(0,m.mdx)("h4",{id:"returns-15"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("h4",{id:"inherited-from-12"},"Inherited from"),(0,m.mdx)("p",null,"Node.rotation"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"rotationinscreen"},"rotationInScreen"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"rotationInScreen"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("p",null,"The node's total rotation angle in degrees, relative to the overall global view of the document – including any\ncumulative rotation from the node's parent containers."),(0,m.mdx)("h4",{id:"returns-16"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("h4",{id:"inherited-from-13"},"Inherited from"),(0,m.mdx)("p",null,"Node.rotationInScreen"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"topleftlocal"},"topLeftLocal"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"topLeftLocal"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("p",null,"Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,\nboundsLocal.y). If the node is rotated, this is not the same as the top-left corner of\nboundsInParent."),(0,m.mdx)("h4",{id:"returns-17"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("h4",{id:"inherited-from-14"},"Inherited from"),(0,m.mdx)("p",null,"Node.topLeftLocal"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"transformmatrix"},"transformMatrix"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"transformMatrix"),"(): ",(0,m.mdx)("a",{parentName:"p",href:"https://glmatrix.net/docs/module-mat2d.html"},(0,m.mdx)("inlineCode",{parentName:"a"},"mat2d"))),(0,m.mdx)("p",null,"The node's transform matrix relative to its parent."),(0,m.mdx)("h4",{id:"returns-18"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"https://glmatrix.net/docs/module-mat2d.html"},(0,m.mdx)("inlineCode",{parentName:"a"},"mat2d"))),(0,m.mdx)("h4",{id:"inherited-from-15"},"Inherited from"),(0,m.mdx)("p",null,"Node.transformMatrix"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"translation"},"translation"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"translation"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("p",null,"The translation of the node along its parent's axes. This is identical to the translation component of\n",(0,m.mdx)("inlineCode",{parentName:"p"},"transformMatrix"),". It is often simpler to set a node's position using ",(0,m.mdx)("inlineCode",{parentName:"p"},"setPositionInParent")," than by\nsetting translation directly."),(0,m.mdx)("h4",{id:"returns-19"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("h4",{id:"inherited-from-16"},"Inherited from"),(0,m.mdx)("p",null,"Node.translation"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,m.mdx)("strong",{parentName:"p"},"translation"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"parameters-4"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"value")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")))))),(0,m.mdx)("h4",{id:"returns-20"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-17"},"Inherited from"),(0,m.mdx)("p",null,"Node.translation"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"type"},"type"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"type"),"(): ",(0,m.mdx)("a",{parentName:"p",href:"../enums/SceneNodeType.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,m.mdx)("p",null,"The node's type."),(0,m.mdx)("h4",{id:"returns-21"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"../enums/SceneNodeType.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,m.mdx)("h4",{id:"inherited-from-18"},"Inherited from"),(0,m.mdx)("p",null,"Node.type"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"visualroot"},"visualRoot"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"visualRoot"),"(): ",(0,m.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,m.mdx)("p",null,"The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned\ncontent, it will be the root of the deleted content (which might be this node itself)."),(0,m.mdx)("p",null,'Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document\'s\nstructure. Nodes that are in different visual roots have no spatial relation to one another; there is no\nmeaningful comparison or conversion between the bounds or coordinate spaces of such nodes.'),(0,m.mdx)("h4",{id:"returns-22"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,m.mdx)("h4",{id:"inherited-from-19"},"Inherited from"),(0,m.mdx)("p",null,"Node.visualRoot"),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"width"},"width"),(0,m.mdx)("p",null,"• ",(0,m.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,m.mdx)("strong",{parentName:"p"},"width"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("p",null,"The width of the node."),(0,m.mdx)("h4",{id:"returns-23"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"number")),(0,m.mdx)("h4",{id:"implementation-of-1"},"Implementation of"),(0,m.mdx)("p",null,"Readonly.width"),(0,m.mdx)("h2",{id:"methods"},"Methods"),(0,m.mdx)("h3",{id:"boundsinnode"},"boundsInNode"),(0,m.mdx)("p",null,"▸ ",(0,m.mdx)("strong",{parentName:"p"},"boundsInNode"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"targetNode"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,m.mdx)("p",null,"Convert the node's ",(0,m.mdx)("a",{parentName:"p",href:"GridLayoutNode.md#boundslocal"},"boundsLocal")," to an axis-aligned bounding box in the coordinate space of the target\nnode. Both nodes must share the same ",(0,m.mdx)("a",{parentName:"p",href:"GridLayoutNode.md#visualroot"},"visualRoot"),", but can lie anywhere within that subtree\nrelative to one another (the target node need not be an ancestor of this node, nor vice versa)."),(0,m.mdx)("h4",{id:"parameters-5"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"targetNode")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"VisualNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"VisualNode")))))),(0,m.mdx)("h4",{id:"returns-24"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,m.mdx)("h4",{id:"inherited-from-20"},"Inherited from"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"Node.md"},"Node"),".",(0,m.mdx)("a",{parentName:"p",href:"Node.md#boundsinnode"},"boundsInNode")),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"localpointinnode"},"localPointInNode"),(0,m.mdx)("p",null,"▸ ",(0,m.mdx)("strong",{parentName:"p"},"localPointInNode"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"localPoint"),", ",(0,m.mdx)("inlineCode",{parentName:"p"},"targetNode"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("p",null,"Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.\nBoth nodes must share the same ",(0,m.mdx)("a",{parentName:"p",href:"GridLayoutNode.md#visualroot"},"visualRoot"),", but can lie anywhere within that subtree relative to one\nanother (the target node need not be an ancestor of this node, nor vice versa)."),(0,m.mdx)("h4",{id:"parameters-6"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"localPoint")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")))),(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"targetNode")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"VisualNode.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"VisualNode")))))),(0,m.mdx)("h4",{id:"returns-25"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,m.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,m.mdx)("h4",{id:"inherited-from-21"},"Inherited from"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"Node.md"},"Node"),".",(0,m.mdx)("a",{parentName:"p",href:"Node.md#localpointinnode"},"localPointInNode")),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"removefromparent"},"removeFromParent"),(0,m.mdx)("p",null,"▸ ",(0,m.mdx)("strong",{parentName:"p"},"removeFromParent"),"(): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("p",null,"Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the\ndocument is closed."),(0,m.mdx)("p",null,"If parent is a basic ContainerNode, this is equivalent to ",(0,m.mdx)("inlineCode",{parentName:"p"},"node.parent.children.remove(node)"),'. For nodes with other\nchild "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit\nremoval. No-op if node is already an orphan.'),(0,m.mdx)("h4",{id:"returns-26"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-22"},"Inherited from"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"Node.md"},"Node"),".",(0,m.mdx)("a",{parentName:"p",href:"Node.md#removefromparent"},"removeFromParent")),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"setpositioninparent"},"setPositionInParent"),(0,m.mdx)("p",null,"▸ ",(0,m.mdx)("strong",{parentName:"p"},"setPositionInParent"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"parentPoint"),", ",(0,m.mdx)("inlineCode",{parentName:"p"},"localRegistrationPoint"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("p",null,"Move the node so the given ",(0,m.mdx)("inlineCode",{parentName:"p"},"localRegistrationPoint")," in its local coordinates is placed at the given\n",(0,m.mdx)("inlineCode",{parentName:"p"},"parentPoint")," in its parent's coordinates (taking into account any rotation on this node, etc.)."),(0,m.mdx)("p",null,(0,m.mdx)("strong",{parentName:"p"},(0,m.mdx)("inlineCode",{parentName:"strong"},"Example"))),(0,m.mdx)("p",null,"Center a rectangle within its parent artboard:"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-js"},"rectangle.setPositionInParent(\n    { x: artboard.width / 2, y: artboard.height / 2 },\n    { x: rectangle.width / 2, y: rectangle.height / 2 }\n);\n")),(0,m.mdx)("h4",{id:"parameters-7"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Description"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"parentPoint")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,m.mdx)("td",{parentName:"tr",align:"left"},"Point in this node's parent's coordinate space to move ",(0,m.mdx)("inlineCode",{parentName:"td"},"localRegistrationPoint")," to")),(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"localRegistrationPoint")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,m.mdx)("td",{parentName:"tr",align:"left"},"Point in this node's local coordinate space to align with ",(0,m.mdx)("inlineCode",{parentName:"td"},"parentPoint"))))),(0,m.mdx)("h4",{id:"returns-27"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-23"},"Inherited from"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"Node.md"},"Node"),".",(0,m.mdx)("a",{parentName:"p",href:"Node.md#setpositioninparent"},"setPositionInParent")),(0,m.mdx)("hr",null),(0,m.mdx)("h3",{id:"setrotationinparent"},"setRotationInParent"),(0,m.mdx)("p",null,"▸ ",(0,m.mdx)("strong",{parentName:"p"},"setRotationInParent"),"(",(0,m.mdx)("inlineCode",{parentName:"p"},"angleInDegrees"),", ",(0,m.mdx)("inlineCode",{parentName:"p"},"localRotationPoint"),"): ",(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("p",null,"Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the\nnode’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already\nhave had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other\nancestors also have rotation of their own."),(0,m.mdx)("p",null,(0,m.mdx)("strong",{parentName:"p"},(0,m.mdx)("inlineCode",{parentName:"strong"},"Example"))),(0,m.mdx)("p",null,"Rotate the rectangle 45 degrees clockwise around its centerpoint:"),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-js"},"rectangle.setRotationInParent(45, { x: rectangle.width / 2, y: rectangle.height / 2 });\n")),(0,m.mdx)("h4",{id:"parameters-8"},"Parameters"),(0,m.mdx)("table",null,(0,m.mdx)("thead",{parentName:"table"},(0,m.mdx)("tr",{parentName:"thead"},(0,m.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Type"),(0,m.mdx)("th",{parentName:"tr",align:"left"},"Description"))),(0,m.mdx)("tbody",{parentName:"table"},(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"angleInDegrees")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"number")),(0,m.mdx)("td",{parentName:"tr",align:"left"},"Angle in degrees.")),(0,m.mdx)("tr",{parentName:"tbody"},(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("inlineCode",{parentName:"td"},"localRotationPoint")),(0,m.mdx)("td",{parentName:"tr",align:"left"},(0,m.mdx)("a",{parentName:"td",href:"../interfaces/Point.md"},(0,m.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,m.mdx)("td",{parentName:"tr",align:"left"},"Point to rotate around, in node's local coordinates.")))),(0,m.mdx)("h4",{id:"returns-28"},"Returns"),(0,m.mdx)("p",null,(0,m.mdx)("inlineCode",{parentName:"p"},"void")),(0,m.mdx)("h4",{id:"inherited-from-24"},"Inherited from"),(0,m.mdx)("p",null,(0,m.mdx)("a",{parentName:"p",href:"Node.md"},"Node"),".",(0,m.mdx)("a",{parentName:"p",href:"Node.md#setrotationinparent"},"setRotationInParent")))}x.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-document-sandbox-document-apis-classes-grid-layout-node-md-103602d0ad7906c8ab29.js.map