"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[7375],{79472:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return o},default:function(){return h}});var t=a(58168),d=a(80045),r=(a(88763),a(15680)),m=a(83407);const i=["components"],o={},l=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var p;const s={_frontmatter:o},x=m.A;function h(e){let{components:n}=e,a=(0,d.A)(e,i);return(0,r.mdx)(x,(0,t.A)({},s,a,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../overview.md"},"@express-document-sdk")," / RectangleNode"),(0,r.mdx)("h1",{id:"class-rectanglenode"},"Class: RectangleNode"),(0,r.mdx)("p",null,"A RectangleNode represents a rectangle shape in the scenegraph."),(0,r.mdx)("p",null,"To create a new rectangle, see ",(0,r.mdx)("a",{parentName:"p",href:"Editor.md#createrectangle"},"Editor.createRectangle"),"."),(0,r.mdx)("h2",{id:"extends"},"Extends"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"FillableNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"FillableNode")))),(0,r.mdx)("h2",{id:"implements"},"Implements"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"../interfaces/IRectangularNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"IRectangularNode")))),(0,r.mdx)("h2",{id:"accessors"},"Accessors"),(0,r.mdx)("h3",{id:"addondata"},"addOnData"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"addOnData"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"AddOnData.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"AddOnData"))),(0,r.mdx)(l,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"IMPORTANT:")," This is currently ",(0,r.mdx)("strong",{parentName:"p"},(0,r.mdx)("em",{parentName:"strong"},"experimental only"))," and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the ",(0,r.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag to ",(0,r.mdx)("inlineCode",{parentName:"p"},"true")," in the ",(0,r.mdx)("a",{parentName:"p",href:"../../../manifest/index.md#requirements"},(0,r.mdx)("inlineCode",{parentName:"a"},"requirements"))," section of the ",(0,r.mdx)("inlineCode",{parentName:"p"},"manifest.json"),"."),(0,r.mdx)("p",null,"Get ",(0,r.mdx)("a",{parentName:"p",href:"AddOnData.md"},"AddOnData")," reference for managing the private metadata on this node for this add-on."),(0,r.mdx)("h4",{id:"returns"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"AddOnData.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"AddOnData"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"allchildren"},"allChildren"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"allChildren"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,r.mdx)("a",{parentName:"p",href:"Node.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Node")),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),">",">"),(0,r.mdx)("p",null,"Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or\nGroupNode also provide a mutable ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md#children"},"ContainerNode.children"),' list. Other nodes with a more specific structure can\nhold children in various discrete "slots"; this ',(0,r.mdx)("inlineCode",{parentName:"p"},"allChildren")," list includes ",(0,r.mdx)("em",{parentName:"p"},"all")," such children and reflects their\noverall display z-order."),(0,r.mdx)("p",null,"The children of a Node are always other Node classes (never the more minimal BaseNode)."),(0,r.mdx)("h4",{id:"returns-1"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,r.mdx)("a",{parentName:"p",href:"Node.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Node")),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),">",">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"blendmode"},"blendMode"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"blendMode"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"../enumerations/BlendMode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"BlendMode"))),(0,r.mdx)("p",null,"Blend mode determines how a node is composited onto the content below it. The default value is\n",(0,r.mdx)("a",{parentName:"p",href:"../enumerations/BlendMode.md#normal"},"BlendMode.normal")," for most nodes, and ",(0,r.mdx)("a",{parentName:"p",href:"../enumerations/BlendMode.md#passthrough"},"BlendMode.passThrough")," for GroupNodes."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"blendMode"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("a",{parentName:"p",href:"../enumerations/BlendMode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"BlendMode"))),(0,r.mdx)("h4",{id:"returns-2"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../enumerations/BlendMode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"BlendMode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"bottomleftradius"},"bottomLeftRadius"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"bottomLeftRadius"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The radius of the bottom left corner, or 0 if the corner is not rounded."),(0,r.mdx)("h4",{id:"remarks"},"Remarks"),(0,r.mdx)("p",null,"The actual corner radius that is rendered is capped based on the size of the rectangle\neven if the radius value set here is higher."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"bottomLeftRadius"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-1"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-3"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"bottomrightradius"},"bottomRightRadius"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"bottomRightRadius"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The radius of the bottom right corner, or 0 if the corner is not rounded."),(0,r.mdx)("h4",{id:"remarks-1"},"Remarks"),(0,r.mdx)("p",null,"The actual corner radius that is rendered is capped based on the size of the rectangle\neven if the radius value set here is higher."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"bottomRightRadius"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-2"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-4"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"boundsinparent"},"boundsInParent"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"boundsInParent"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("p",null,"An axis-aligned box in the parent’s coordinate space encompassing the node’s layout bounds (its\n",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#boundslocal"},"boundsLocal"),", as transformed by its position and rotation relative to the parent). If the node has\nrotation, the top-left of its boundsLocal box (aligned to its own axes) is not necessarily located at the\ntop-left of the boundsInParent box (since it's aligned to the parent's axes). This value is well-defined\neven for an orphan node with no parent."),(0,r.mdx)("h4",{id:"returns-5"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"boundslocal"},"boundsLocal"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"boundsLocal"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("p",null,'The bounding box of the node, expressed in the node\'s local coordinate space (which may be shifted or rotated\nrelative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path\n"spine" of the shape as well as its stroke, but excluding effects such as shadows.'),(0,r.mdx)("p",null,"The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is\n",(0,r.mdx)("em",{parentName:"p"},"not")," necessarily (0,0) – this is especially true for Text and Path nodes."),(0,r.mdx)("h4",{id:"returns-6"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"centerpointlocal"},"centerPointLocal"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"centerPointLocal"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal\nbox."),(0,r.mdx)("h4",{id:"returns-7"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"fill"},"fill"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"fill"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Fill")),">"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"fill"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"fill"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"The fill applied to the shape, if any."),(0,r.mdx)("h4",{id:"parameters-3"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"fill"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Fill"))),(0,r.mdx)("h4",{id:"returns-8"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Fill")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"height"},"height"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"height"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The height of the node.\nMust be at least MIN_DIMENSION."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"height"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-4"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-9"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"id"},"id"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"id"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("p",null,"A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is\nmoved to a different part of the document."),(0,r.mdx)("h4",{id:"returns-10"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"locked"},"locked"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"locked"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,r.mdx)("p",null,"The node's lock/unlock state. Locked nodes are excluded from the selection (see ",(0,r.mdx)("a",{parentName:"p",href:"Context.md#selection"},"Context.selection"),"), and\ncannot be edited by the user in the UI unless they are unlocked first. Operations on locked nodes using the API\nare permitted. However, please consider if modifying a locked node would align with user expectations\nbefore using the API to make changes to locked nodes."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"locked"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"locked"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-5"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"locked"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,r.mdx)("h4",{id:"returns-11"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"opacity"},"opacity"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"opacity"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The node's opacity, from 0.0 to 1.0"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"opacity"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"opacity"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-6"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"opacity"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-12"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"parent"},"parent"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"parent"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,r.mdx)("p",null,"The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document\ncontent."),(0,r.mdx)("p",null,'Nodes that have been deleted are "orphaned," with a parent chain that terminates in ',(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," without reaching the\nroot node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node\nthat was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo."),(0,r.mdx)("h4",{id:"returns-13"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"rotation"},"rotation"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"rotation"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The node's local rotation angle in degrees, relative to its parent's axes. Use ",(0,r.mdx)("inlineCode",{parentName:"p"},"setRotationInParent")," to\nchange rotation by rotating around a defined centerpoint."),(0,r.mdx)("h4",{id:"returns-14"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"rotationinscreen"},"rotationInScreen"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"rotationInScreen"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The node's total rotation angle in degrees, relative to the overall global view of the document – including any\ncumulative rotation from the node's parent containers."),(0,r.mdx)("h4",{id:"returns-15"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"stroke"},"stroke"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"stroke"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Stroke.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Stroke")),">"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"stroke"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"stroke"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"The stroke applied to the shape, if any.\nOnly ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/SolidColorStroke.md"},"SolidColorStroke"),' values are supported by the setter, but the "type" field is optional\nfor backward compatibility. Throws if another type is provided.'),(0,r.mdx)("h4",{id:"parameters-7"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"stroke"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("a",{parentName:"p",href:"../type-aliases/SolidColorStrokeWithOptionalType.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"SolidColorStrokeWithOptionalType"))),(0,r.mdx)("h4",{id:"returns-16"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Stroke.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Stroke")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"topleftlocal"},"topLeftLocal"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"topLeftLocal"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,\nboundsLocal.y). If the node is rotated, this is not the same as the top-left corner of\nboundsInParent."),(0,r.mdx)("h4",{id:"returns-17"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"topleftradius"},"topLeftRadius"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"topLeftRadius"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The radius of the top left corner, or 0 if the corner is not rounded."),(0,r.mdx)("h4",{id:"remarks-2"},"Remarks"),(0,r.mdx)("p",null,"The actual corner radius that is rendered is capped based on the size of the rectangle\neven if the radius value set here is higher."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"topLeftRadius"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-8"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-18"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"toprightradius"},"topRightRadius"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"topRightRadius"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The radius of the top right corner, or 0 if the corner is not rounded."),(0,r.mdx)("h4",{id:"remarks-3"},"Remarks"),(0,r.mdx)("p",null,"The actual corner radius that is rendered is capped based on the size of the rectangle\neven if the radius value set here is higher."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"topRightRadius"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-9"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-19"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"transformmatrix"},"transformMatrix"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"transformMatrix"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"https://glmatrix.net/docs/module-mat2d.html"},(0,r.mdx)("inlineCode",{parentName:"a"},"mat2d"))),(0,r.mdx)("p",null,"The node's transform matrix relative to its parent."),(0,r.mdx)("h4",{id:"returns-20"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"https://glmatrix.net/docs/module-mat2d.html"},(0,r.mdx)("inlineCode",{parentName:"a"},"mat2d"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"translation"},"translation"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"translation"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"The translation of the node along its parent's axes. This is identical to the translation component of\n",(0,r.mdx)("inlineCode",{parentName:"p"},"transformMatrix"),". It is often simpler to set a node's position using ",(0,r.mdx)("inlineCode",{parentName:"p"},"setPositionInParent")," than by\nsetting translation directly."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"translation"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-10"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,r.mdx)("h4",{id:"returns-21"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"type"},"type"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"type"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"../enumerations/SceneNodeType.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,r.mdx)("p",null,"The node's type."),(0,r.mdx)("h4",{id:"returns-22"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../enumerations/SceneNodeType.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"visualroot"},"visualRoot"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"visualRoot"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("p",null,"The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned\ncontent, it will be the root of the deleted content (which might be this node itself)."),(0,r.mdx)("p",null,'Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document\'s\nstructure. Nodes that are in different visual roots have no spatial relation to one another; there is no\nmeaningful comparison or conversion between the bounds or coordinate spaces of such nodes.'),(0,r.mdx)("h4",{id:"returns-23"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"width"},"width"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"width"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The width of the node.\nMust be at least MIN_DIMENSION."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"width"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"parameters-11"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"value"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-24"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h2",{id:"methods"},"Methods"),(0,r.mdx)("h3",{id:"boundsinnode"},"boundsInNode()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"boundsInNode"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"targetNode"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("p",null,"Convert the node's ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#boundslocal"},"boundsLocal")," to an axis-aligned bounding box in the coordinate space of the target\nnode. Both nodes must share the same ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#visualroot"},"visualRoot"),", but can lie anywhere within that subtree\nrelative to one another (the target node need not be an ancestor of this node, nor vice versa)."),(0,r.mdx)("h4",{id:"parameters-12"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"targetNode"),": ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("h4",{id:"returns-25"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("h4",{id:"inherited-from"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"FillableNode")),".",(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md#boundsinnode"},(0,r.mdx)("inlineCode",{parentName:"a"},"boundsInNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"getuniformcornerradius"},"getUniformCornerRadius()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"getUniformCornerRadius"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"If all corners have the same rounding radius value, returns that value (or 0 if all corners are not rounded).\nIf the corner radii differ, returns undefined."),(0,r.mdx)("h4",{id:"returns-26"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"localpointinnode"},"localPointInNode()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"localPointInNode"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"localPoint"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"targetNode"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.\nBoth nodes must share the same ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#visualroot"},"visualRoot"),", but can lie anywhere within that subtree relative to one\nanother (the target node need not be an ancestor of this node, nor vice versa)."),(0,r.mdx)("h4",{id:"parameters-13"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"localPoint"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"targetNode"),": ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("h4",{id:"returns-27"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("h4",{id:"inherited-from-1"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"FillableNode")),".",(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md#localpointinnode"},(0,r.mdx)("inlineCode",{parentName:"a"},"localPointInNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"removefromparent"},"removeFromParent()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"removeFromParent"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the\ndocument is closed."),(0,r.mdx)("p",null,"If parent is a basic ContainerNode, this is equivalent to ",(0,r.mdx)("inlineCode",{parentName:"p"},"node.parent.children.remove(node)"),'. For nodes with other\nchild "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit\nremoval. No-op if node is already an orphan.'),(0,r.mdx)("h4",{id:"returns-28"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"inherited-from-2"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"FillableNode")),".",(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md#removefromparent"},(0,r.mdx)("inlineCode",{parentName:"a"},"removeFromParent"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"setpositioninparent"},"setPositionInParent()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"setPositionInParent"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"parentPoint"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"localRegistrationPoint"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"Move the node so the given ",(0,r.mdx)("inlineCode",{parentName:"p"},"localRegistrationPoint")," in its local coordinates is placed at the given\n",(0,r.mdx)("inlineCode",{parentName:"p"},"parentPoint")," in its parent's coordinates (taking into account any rotation on this node, etc.)."),(0,r.mdx)("h4",{id:"parameters-14"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"parentPoint"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,r.mdx)("p",null,"Point in this node's parent's coordinate space to move ",(0,r.mdx)("inlineCode",{parentName:"p"},"localRegistrationPoint")," to"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"localRegistrationPoint"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,r.mdx)("p",null,"Point in this node's local coordinate space to align with ",(0,r.mdx)("inlineCode",{parentName:"p"},"parentPoint")),(0,r.mdx)("h4",{id:"returns-29"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"inherited-from-3"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"FillableNode")),".",(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md#setpositioninparent"},(0,r.mdx)("inlineCode",{parentName:"a"},"setPositionInParent"))),(0,r.mdx)("h4",{id:"example"},"Example"),(0,r.mdx)("p",null,"Center a rectangle within its parent artboard:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"rectangle.setPositionInParent(\n    { x: artboard.width / 2, y: artboard.height / 2 },\n    { x: rectangle.width / 2, y: rectangle.height / 2 }\n);\n")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"setrotationinparent"},"setRotationInParent()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"setRotationInParent"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"angleInDegrees"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"localRotationPoint"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"Set the node’s rotation angle relative to its parent to exactly the given value, keeping the given point in the\nnode’s local coordinate space at a fixed location within the parent. Disregards any rotation the node may already\nhave had. The angle set here may not be the absolute rotation angle seen on screen, if the parent or other\nancestors also have rotation of their own."),(0,r.mdx)("h4",{id:"parameters-15"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"angleInDegrees"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"Angle in degrees."),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"localRotationPoint"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,r.mdx)("p",null,"Point to rotate around, in node's local coordinates."),(0,r.mdx)("h4",{id:"returns-30"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"inherited-from-4"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"FillableNode")),".",(0,r.mdx)("a",{parentName:"p",href:"FillableNode.md#setrotationinparent"},(0,r.mdx)("inlineCode",{parentName:"a"},"setRotationInParent"))),(0,r.mdx)("h4",{id:"example-1"},"Example"),(0,r.mdx)("p",null,"Rotate the rectangle 45 degrees clockwise around its centerpoint:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"rectangle.setRotationInParent(45, { x: rectangle.width / 2, y: rectangle.height / 2 });\n")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"setuniformcornerradius"},"setUniformCornerRadius()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"setUniformCornerRadius"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"radius"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"Set all corner radii to the same value. Set to 0 to make the corners non-rounded."),(0,r.mdx)("h4",{id:"parameters-16"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"radius"),": ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h4",{id:"returns-31"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"remarks-4"},"Remarks"),(0,r.mdx)("p",null,"The actual corner radius that is rendered is capped based on the size of the rectangle\neven if the radius value set here is higher."))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-document-sandbox-document-apis-classes-rectangle-node-md-076eb0495a4dc357af87.js.map