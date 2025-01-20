"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[3011],{12746:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return i},default:function(){return h}});var d=a(58168),t=a(80045),r=(a(88763),a(15680)),m=a(83407);const o=["components"],i={},l=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var p;const s={_frontmatter:i},x=m.A;function h(e){let{components:n}=e,a=(0,t.A)(e,o);return(0,r.mdx)(x,(0,d.A)({},s,a,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../overview.md"},"@express-document-sdk")," / ArtboardNode"),(0,r.mdx)("h1",{id:"class-artboardnode"},"Class: ArtboardNode"),(0,r.mdx)("p",null,"An ArtboardNode represents an artboard object in the scenegraph. All user visual content must be contained on an artboard.\nArtboards are always contained on a ",(0,r.mdx)("a",{parentName:"p",href:"PageNode.md"},"PageNode"),'; when a page contains multiple artboards, the artboards represent\n"scenes" in a linear timeline sequence.'),(0,r.mdx)("p",null,"To create a new artboard, see ",(0,r.mdx)("a",{parentName:"p",href:"ArtboardList.md#addartboard"},"ArtboardList.addArtboard"),"."),(0,r.mdx)("p",null,"Please note that creating and deleting an artboard in a single frame will crash the editor."),(0,r.mdx)("h2",{id:"extends"},"Extends"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode")))),(0,r.mdx)("h2",{id:"implements"},"Implements"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"../interfaces/IRectangularNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"IRectangularNode"))),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"../interfaces/ContainerNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ContainerNode")))),(0,r.mdx)("h2",{id:"accessors"},"Accessors"),(0,r.mdx)("h3",{id:"addondata"},"addOnData"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"addOnData"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"AddOnData.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"AddOnData"))),(0,r.mdx)(l,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"IMPORTANT:")," This is currently ",(0,r.mdx)("strong",{parentName:"p"},(0,r.mdx)("em",{parentName:"strong"},"experimental only"))," and should not be used in any add-ons you will be distributing until it has been declared stable. To use it, you will first need to set the ",(0,r.mdx)("inlineCode",{parentName:"p"},"experimentalApis")," flag to ",(0,r.mdx)("inlineCode",{parentName:"p"},"true")," in the ",(0,r.mdx)("a",{parentName:"p",href:"../../../manifest/index.md#requirements"},(0,r.mdx)("inlineCode",{parentName:"a"},"requirements"))," section of the ",(0,r.mdx)("inlineCode",{parentName:"p"},"manifest.json"),"."),(0,r.mdx)("p",null,"Get ",(0,r.mdx)("a",{parentName:"p",href:"AddOnData.md"},"AddOnData")," reference for managing the private metadata on this node for this add-on."),(0,r.mdx)("h4",{id:"returns"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"AddOnData.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"AddOnData"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"allchildren"},"allChildren"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"allChildren"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,r.mdx)("a",{parentName:"p",href:"Node.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Node")),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),">",">"),(0,r.mdx)("p",null,"Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or\nGroupNode also provide a mutable ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md#children"},"ContainerNode.children"),' list. Other nodes with a more specific structure can\nhold children in various discrete "slots"; this ',(0,r.mdx)("inlineCode",{parentName:"p"},"allChildren")," list includes ",(0,r.mdx)("em",{parentName:"p"},"all")," such children and reflects their\noverall display z-order."),(0,r.mdx)("p",null,"The children of an Artboard are always other Node classes (never the more minimal BaseNode)."),(0,r.mdx)("h4",{id:"returns-1"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,r.mdx)("a",{parentName:"p",href:"Node.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Node")),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"any"),">",">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"boundslocal"},"boundsLocal"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"boundsLocal"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("p",null,'The bounding box of the node, expressed in the node\'s local coordinate space (which may be shifted or rotated\nrelative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path\n"spine" of the shape as well as its stroke, but excluding effects such as shadows.'),(0,r.mdx)("p",null,"The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is\n",(0,r.mdx)("em",{parentName:"p"},"not")," necessarily (0,0) – this is especially true for Text and Path nodes."),(0,r.mdx)("h4",{id:"returns-2"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Rect.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Rect")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"centerpointlocal"},"centerPointLocal"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"centerPointLocal"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal\nbox."),(0,r.mdx)("h4",{id:"returns-3"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"children"},"children"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"children"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"ItemList.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ItemList")),"<",(0,r.mdx)("a",{parentName:"p",href:"Node.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Node")),">"),(0,r.mdx)("p",null,"The node's children. Use the methods on this ItemList object to get, add, and remove children."),(0,r.mdx)("h4",{id:"returns-4"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"ItemList.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ItemList")),"<",(0,r.mdx)("a",{parentName:"p",href:"Node.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Node")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"fill"},"fill"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"fill"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Fill")),">"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"set")," ",(0,r.mdx)("strong",{parentName:"p"},"fill"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"fill"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"The background fill of the artboard. Artboards must always have a fill."),(0,r.mdx)("h4",{id:"parameters"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"fill"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Fill"))),(0,r.mdx)("h4",{id:"returns-5"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Fill.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Fill")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"height"},"height"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"height"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The height of the artboard."),(0,r.mdx)("h4",{id:"returns-6"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"id"},"id"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"id"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("p",null,"A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is\nmoved to a different part of the document."),(0,r.mdx)("h4",{id:"returns-7"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"parent"},"parent"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"parent"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("a",{parentName:"p",href:"PageNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"PageNode"))),(0,r.mdx)("p",null,"The node's parent. Undefined if the node is an orphan."),(0,r.mdx)("h4",{id:"returns-8"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.mdx)("a",{parentName:"p",href:"PageNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"PageNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"topleftlocal"},"topLeftLocal"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"topLeftLocal"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,\nboundsLocal.y). If the node is rotated, this is not the same as the top-left corner of\nboundsInParent."),(0,r.mdx)("h4",{id:"returns-9"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"type"},"type"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"type"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"../enumerations/SceneNodeType.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,r.mdx)("p",null,"The node's type."),(0,r.mdx)("h4",{id:"returns-10"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../enumerations/SceneNodeType.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"visualroot"},"visualRoot"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"visualRoot"),"(): ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("p",null,"The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned\ncontent, it will be the root of the deleted content (which might be this node itself)."),(0,r.mdx)("p",null,'Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document\'s\nstructure. Nodes that are in different visual roots have no spatial relation to one another; there is no\nmeaningful comparison or conversion between the bounds or coordinate spaces of such nodes.'),(0,r.mdx)("h4",{id:"returns-11"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"width"},"width"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,r.mdx)("strong",{parentName:"p"},"width"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("p",null,"The width of the artboard."),(0,r.mdx)("h4",{id:"returns-12"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"number")),(0,r.mdx)("h2",{id:"methods"},"Methods"),(0,r.mdx)("h3",{id:"localpointinnode"},"localPointInNode()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"localPointInNode"),"(",(0,r.mdx)("inlineCode",{parentName:"p"},"localPoint"),", ",(0,r.mdx)("inlineCode",{parentName:"p"},"targetNode"),"): ",(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("p",null,"Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.\nBoth nodes must share the same ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#visualroot"},"visualRoot"),", but can lie anywhere within that subtree relative to one\nanother (the target node need not be an ancestor of this node, nor vice versa)."),(0,r.mdx)("h4",{id:"parameters-1"},"Parameters"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"localPoint"),": ",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point"))),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"targetNode"),": ",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,r.mdx)("h4",{id:"returns-13"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,r.mdx)("h4",{id:"implementation-of"},"Implementation of"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ContainerNode")),".",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md#localpointinnode"},(0,r.mdx)("inlineCode",{parentName:"a"},"localPointInNode"))),(0,r.mdx)("h4",{id:"inherited-from"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode")),".",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#localpointinnode"},(0,r.mdx)("inlineCode",{parentName:"a"},"localPointInNode"))),(0,r.mdx)("hr",null),(0,r.mdx)("h3",{id:"removefromparent"},"removeFromParent()"),(0,r.mdx)("p",null,"• ",(0,r.mdx)("strong",{parentName:"p"},"removeFromParent"),"(): ",(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("p",null,"Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the\ndocument is closed."),(0,r.mdx)("p",null,"If parent is a basic ContainerNode, this is equivalent to ",(0,r.mdx)("inlineCode",{parentName:"p"},"node.parent.children.remove(node)"),'. For nodes with other\nchild "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit\nremoval. No-op if node is already an orphan.'),(0,r.mdx)("h4",{id:"returns-14"},"Returns"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"void")),(0,r.mdx)("h4",{id:"implementation-of-1"},"Implementation of"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ContainerNode")),".",(0,r.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md#removefromparent"},(0,r.mdx)("inlineCode",{parentName:"a"},"removeFromParent"))),(0,r.mdx)("h4",{id:"inherited-from-1"},"Inherited from"),(0,r.mdx)("p",null,(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"VisualNode")),".",(0,r.mdx)("a",{parentName:"p",href:"VisualNode.md#removefromparent"},(0,r.mdx)("inlineCode",{parentName:"a"},"removeFromParent"))))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-document-sandbox-document-apis-classes-artboard-node-md-eabdacf3485b6dae4699.js.map