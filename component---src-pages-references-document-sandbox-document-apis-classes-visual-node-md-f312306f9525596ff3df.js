"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[5613],{8349:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return m},default:function(){return s}});var a=t(87462),d=t(45987),o=(t(15007),t(64983)),r=t(91515);const i=["components"],m={},l={_frontmatter:m},p=r.Z;function s(e){let{components:n}=e,t=(0,d.Z)(e,i);return(0,o.mdx)(p,(0,a.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("p",null,(0,o.mdx)("a",{parentName:"p",href:"../overview.md"},"@express-document-sdk")," / VisualNode"),(0,o.mdx)("h1",{id:"class-visualnode"},"Class: VisualNode"),(0,o.mdx)("p",null,'A "node" represents an object in the scenegraph, the document\'s visual content tree. This class represents any node\nthat can be visually perceived in the content. Most visual content is a subclass of the richer Node class which extends\nVisualNode with more properties, but the overall ArtboardNode container only supports the VisualNode APIs\n(and higher-level more abstract containers like PageNode extend only the minimal BaseNode class).'),(0,o.mdx)("p",null,"Some VisualNodes might have a non-visual parent such as a PageNode."),(0,o.mdx)("h2",{id:"hierarchy"},"Hierarchy"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("p",{parentName:"li"},(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,o.mdx)("p",{parentName:"li"},"↳ ",(0,o.mdx)("strong",{parentName:"p"},(0,o.mdx)("inlineCode",{parentName:"strong"},"VisualNode"))),(0,o.mdx)("p",{parentName:"li"},"↳↳ ",(0,o.mdx)("a",{parentName:"p",href:"ArtboardNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"ArtboardNode"))),(0,o.mdx)("p",{parentName:"li"},"↳↳ ",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"ContainerNode"))),(0,o.mdx)("p",{parentName:"li"},"↳↳ ",(0,o.mdx)("a",{parentName:"p",href:"Node.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Node"))))),(0,o.mdx)("h2",{id:"accessors"},"Accessors"),(0,o.mdx)("h3",{id:"allchildren"},"allChildren"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"allChildren"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"BaseNode")),">",">"),(0,o.mdx)("p",null,"Returns a read-only list of all children of the node. General-purpose content containers such as ArtboardNode or\nGroupNode also provide a mutable ",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/ContainerNode.md#children"},"children"),' list. Other nodes with a more specific structure can\nhold children in various discrete "slots"; this ',(0,o.mdx)("inlineCode",{parentName:"p"},"allChildren")," list includes ",(0,o.mdx)("em",{parentName:"p"},"all")," such children and reflects their\noverall display z-order."),(0,o.mdx)("p",null,"Although BaseNode's allChildren may yield other BaseNodes, the subclasses Node and ArtboardNode override allChildren\nto guarantee all their children are full-fledged Node instances."),(0,o.mdx)("h4",{id:"returns"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"BaseNode")),">",">"),(0,o.mdx)("h4",{id:"inherited-from"},"Inherited from"),(0,o.mdx)("p",null,"BaseNode.allChildren"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"boundslocal"},"boundsLocal"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"boundsLocal"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,o.mdx)("p",null,'The bounding box of the node, expressed in the node\'s local coordinate space (which may be shifted or rotated\nrelative to its parent). Generally matches the selection outline seen in the UI, encompassing the vector path\n"spine" of the shape as well as its stroke, but excluding effects such as shadows.'),(0,o.mdx)("p",null,"The top-left corner of the bounding box corresponds to the visual top-left corner of the node, but this value is\n",(0,o.mdx)("em",{parentName:"p"},"not")," necessarily (0,0) – this is especially true for Text and Path nodes."),(0,o.mdx)("h4",{id:"returns-1"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("inlineCode",{parentName:"p"},"Rect"),">"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"centerpointlocal"},"centerPointLocal"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"centerPointLocal"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,o.mdx)("p",null,"Position of the node's centerpoint in its own local coordinate space, i.e. the center of the boundsLocal\nbox."),(0,o.mdx)("h4",{id:"returns-2"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"id"},"id"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"id"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"string")),(0,o.mdx)("p",null,"A unique identifier for this node that stays the same when the file is closed & reopened, or if the node is\nmoved to a different part of the document."),(0,o.mdx)("h4",{id:"returns-3"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"string")),(0,o.mdx)("h4",{id:"inherited-from-1"},"Inherited from"),(0,o.mdx)("p",null,"BaseNode.id"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"parent"},"parent"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"parent"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,o.mdx)("p",null,"The node's parent. The parent chain will eventually reach ExpressRootNode for all nodes that are part of the document\ncontent."),(0,o.mdx)("p",null,'Nodes that have been deleted are "orphaned," with a parent chain that terminates in ',(0,o.mdx)("inlineCode",{parentName:"p"},"undefined")," without reaching the\nroot node. Such nodes cannot be selected, so it is unlikely to encounter one unless you retain a reference to a node\nthat was part of the document content earlier. Deleted nodes can be reattached to the scenegraph, e.g. via Undo."),(0,o.mdx)("h4",{id:"returns-4"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"BaseNode"))),(0,o.mdx)("h4",{id:"inherited-from-2"},"Inherited from"),(0,o.mdx)("p",null,"BaseNode.parent"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"topleftlocal"},"topLeftLocal"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"topLeftLocal"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,o.mdx)("p",null,"Position of the node's top-left corner in its own local coordinate space, equal to (boundsLocal.x,\nboundsLocal.y). If the node is rotated, this is not the same as the top-left corner of\nboundsInParent."),(0,o.mdx)("h4",{id:"returns-5"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"type"},"type"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"type"),"(): ",(0,o.mdx)("a",{parentName:"p",href:"../enums/SceneNodeType.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,o.mdx)("p",null,"The node's type."),(0,o.mdx)("h4",{id:"returns-6"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("a",{parentName:"p",href:"../enums/SceneNodeType.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"SceneNodeType"))),(0,o.mdx)("h4",{id:"inherited-from-3"},"Inherited from"),(0,o.mdx)("p",null,"BaseNode.type"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"visualroot"},"visualRoot"),(0,o.mdx)("p",null,"• ",(0,o.mdx)("inlineCode",{parentName:"p"},"get")," ",(0,o.mdx)("strong",{parentName:"p"},"visualRoot"),"(): ",(0,o.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,o.mdx)("p",null,"The highest ancestor that still has visual presence in the document. Typically an Artboard, but for orphaned\ncontent, it will be the root of the deleted content (which might be this node itself)."),(0,o.mdx)("p",null,'Nodes that are both in the same visualRoot subtree lie within the same "visual space" of the document\'s\nstructure. Nodes that are in different visual roots have no spatial relation to one another; there is no\nmeaningful comparison or conversion between the bounds or coordinate spaces of such nodes.'),(0,o.mdx)("h4",{id:"returns-7"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("a",{parentName:"p",href:"VisualNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"VisualNode"))),(0,o.mdx)("h2",{id:"methods"},"Methods"),(0,o.mdx)("h3",{id:"localpointinnode"},"localPointInNode"),(0,o.mdx)("p",null,"▸ ",(0,o.mdx)("strong",{parentName:"p"},"localPointInNode"),"(",(0,o.mdx)("inlineCode",{parentName:"p"},"localPoint"),", ",(0,o.mdx)("inlineCode",{parentName:"p"},"targetNode"),"): ",(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,o.mdx)("p",null,"Convert a point given in the node’s local coordinate space to a point in the coordinate space of the target node.\nBoth nodes must share the same ",(0,o.mdx)("a",{parentName:"p",href:"VisualNode.md#visualroot"},"visualRoot"),", but can lie anywhere within that subtree relative to one\nanother (the target node need not be an ancestor of this node, nor vice versa)."),(0,o.mdx)("h4",{id:"parameters"},"Parameters"),(0,o.mdx)("table",null,(0,o.mdx)("thead",{parentName:"table"},(0,o.mdx)("tr",{parentName:"thead"},(0,o.mdx)("th",{parentName:"tr",align:"left"},"Name"),(0,o.mdx)("th",{parentName:"tr",align:"left"},"Type"))),(0,o.mdx)("tbody",{parentName:"table"},(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("inlineCode",{parentName:"td"},"localPoint")),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("inlineCode",{parentName:"td"},"targetNode")),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"VisualNode.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"VisualNode")))))),(0,o.mdx)("h4",{id:"returns-8"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"Readonly"),"<",(0,o.mdx)("a",{parentName:"p",href:"../interfaces/Point.md"},(0,o.mdx)("inlineCode",{parentName:"a"},"Point")),">"),(0,o.mdx)("hr",null),(0,o.mdx)("h3",{id:"removefromparent"},"removeFromParent"),(0,o.mdx)("p",null,"▸ ",(0,o.mdx)("strong",{parentName:"p"},"removeFromParent"),"(): ",(0,o.mdx)("inlineCode",{parentName:"p"},"void")),(0,o.mdx)("p",null,"Removes the node from its parent - effectively deleting it, if the node is not re-added to another parent before the\ndocument is closed."),(0,o.mdx)("p",null,"If parent is a basic ContainerNode, this is equivalent to ",(0,o.mdx)("inlineCode",{parentName:"p"},"node.parent.children.remove(node)"),'. For nodes with other\nchild "slots," removes the child from whichever slot it resides in, if possible. Throws if the slot does not permit\nremoval. No-op if node is already an orphan.'),(0,o.mdx)("h4",{id:"returns-9"},"Returns"),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"void")),(0,o.mdx)("h4",{id:"inherited-from-4"},"Inherited from"),(0,o.mdx)("p",null,(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md"},"BaseNode"),".",(0,o.mdx)("a",{parentName:"p",href:"BaseNode.md#removefromparent"},"removeFromParent")))}s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-references-document-sandbox-document-apis-classes-visual-node-md-f312306f9525596ff3df.js.map