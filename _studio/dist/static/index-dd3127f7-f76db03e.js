import{s as U,a0 as D,r as o,ag as pe,j as r,ah as ke,ct as Ne,$ as he,aL as je,ai as Be,ao as $e,cu as Qe,a7 as fe,q as te,v as qe,y as We,cv as Ye,au as ze,p as B,P as Ue,cw as Ve,J as He,cx as Ge,cy as Ke,cz as Xe,ay as Je,z as Ze,F as et,f as W,aS as tt,a1 as Y,aa as K,a3 as ye,by as nt,ac as st,c3 as rt,g as at,co as ot,cA as it,cB as ct,aR as ge,bt as lt,aV as se,bu as ut,cC as dt,k as mt,bR as re,cD as pt,c6 as ht,c7 as ft,cE as yt,cF as gt,cG as St,cH as X,cI as J,b6 as z,cJ as It,cK as bt,bC as Se,cL as vt,cM as Ie,cN as Lt,b7 as Tt,cO as Rt,cP as Et,cQ as _t,cR as wt}from"./sanity-bb9b8246.js";import{useDeskTool as Ct,useDeskToolSetting as ae,Delay as Pt}from"./index-7415496d-4a923d5c.js";import{P as xt}from"./PaneItem-366729eb-d5e33d08.js";import"./index-9f509cb4.js";var oe,ie,ce,le,ue;function $(s,e){return e||(e=s.slice(0)),Object.freeze(Object.defineProperties(s,{raw:{value:Object.freeze(e)}}))}const de=100,Z=2e3,be={by:[{field:"_updatedAt",direction:"desc"}]},At={};function Ot(s){return yt(s).map(e=>({...e.draft||e.published,hasPublished:!!e.published,hasDraft:!!e.draft}))}const Mt=/\b_type\s*==\s*(['"].*?['"]|\$.*?(?:\s|$))|\B(['"].*?['"]|\$.*?(?:\s|$))\s*==\s*_type\b/;function ve(s){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n=s.match(Mt);if(!n)return null;const t=(n[1]||n[2]).trim().replace(/^["']|["']$/g,"");if(t[0]==="$"){const a=t.slice(1),u=e[a];return typeof u=="string"?u:null}return t}function Dt(s){return/^_type\s*==\s*['"$]\w+['"]?\s*$/.test(s.trim())}function Ft(s,e){const n=s.by.map(t=>{if(t.mapWith)return t;const a=kt(e,t.field);return a?jt(a,"datetime")?{...t,mapWith:"dateTime"}:a.jsonType==="string"?{...t,mapWith:"lower"}:t:t});return n.every((t,a)=>t===s.by[a])?s:{...s,by:n}}function kt(s,e){const n=He(e);let t=s;for(const a of n){if(!t)return;if(typeof a=="string"){t=Nt(t,a);continue}if(!(Ge(a)||Ke(a))||t.jsonType!=="array")return;const[i,l]=t.of||[];if(l||!i)return;if(!Xe(i)){t=i;continue}const[c,h]=i.to||[];if(h||!c)return;t=c}return t}function Nt(s,e){if(!("fields"in s))return;const n=s.fields.find(t=>t.name===e);return n?n.type:void 0}function jt(s,e){let n=s.type;for(;n;){if(n.name===e||!n.type&&n.jsonType===e)return!0;n=n.type}return!1}const Bt=U(D)(oe||(oe=$([`
  position: relative;
`]))),$t=U(D)(ie||(ie=$([`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`]))),Qt=[...Array(30).keys()];function qt(s){const{layout:e}=s;return r(ye,{padding:2,space:1,children:Qt.map(n=>r(fe,{padding:2,children:r(gt,{isPlaceholder:!0,layout:e})},n))})}function Wt(s){const{childItemId:e,error:n,filterIsSimpleTypeConstraint:t,hasMaxItems:a,hasSearchQuery:u,isActive:i,isLazyLoading:l,isLoading:c,items:h,layout:S,loadingVariant:f,onListChange:I,onRetry:R,searchInputElement:m,showIcons:y}=s,E=te(),{collapsed:P}=Je(),{collapsed:p,index:T}=pe(),[b,_]=o.useState(!1),w=o.useCallback(()=>{c||l||!b||I()},[l,c,I,b]);o.useEffect(()=>{if(p)return;const g=setTimeout(()=>{_(!0)},0);return()=>{clearTimeout(g)}},[p,h]);const F=o.useCallback((g,d)=>{let{activeIndex:A}=d;const C=Ze(g._id),O=e===C,L=!i&&O,v=i&&O,Q=A===h.length-1,M=Q&&l,V=Q&&a;return B(et,{children:[r(xt,{icon:y===!1?!1:void 0,id:C,layout:S,marginBottom:1,pressed:L,schemaType:E.get(g._type),selected:v,value:g}),M&&r(W,{align:"center",justify:"center",padding:4,children:r(tt,{muted:!0})}),V&&r(D,{marginY:1,paddingX:3,paddingY:4,children:B(Y,{align:"center",muted:!0,size:1,children:["Displaying a maximum of ",Z," documents"]})})]})},[e,i,h.length,S,E,y,a,l]),x=o.useMemo(()=>u?r(W,{align:"center",direction:"column",height:"fill",justify:"center",children:r(K,{width:1,children:r(D,{paddingX:4,paddingY:5,children:r(Y,{align:"center",muted:!0,children:"No results found"})})})}):r(W,{align:"center",direction:"column",height:"fill",justify:"center",children:r(K,{width:1,children:r(D,{paddingX:4,paddingY:5,children:r(Y,{align:"center",muted:!0,children:t?"No documents of this type":"No matching documents"})})})}),[t,u]),k=o.useMemo(()=>{if(!b)return null;if(n)return r(W,{align:"center",direction:"column",height:"fill",justify:"center",children:r(K,{width:1,children:B(ye,{paddingX:4,paddingY:5,space:4,children:[r(nt,{as:"h3",children:"Could not fetch list items"}),B(Y,{as:"p",children:["Error: ",r("code",{children:n.message})]}),R&&r(D,{children:r(he,{icon:st,onClick:R,text:"Retry",tone:"primary"})})]})})});if(!c&&h.length===0)return x;if(f==="initial"&&c)return r(Pt,{ms:300,children:r(qt,{layout:S})});if(f==="spinner"&&c)return null;const g="".concat(T,"-").concat(p);return r(Bt,{overflow:"hidden",height:"fill",children:r($t,{children:r(rt,{activeItemDataAttr:"data-hovered",ariaLabel:"Document list",canReceiveFocus:!0,focusRingOffset:-3,inputElement:m,itemHeight:51,items:h,onEndReached:w,onlyShowSelectionWhenActive:!0,overscan:10,padding:2,paddingBottom:1,renderItem:F,wrapAround:!1},g)})})},[p,n,w,T,c,h,S,f,R,F,m,b]);return r(at,{overflow:P||f==="initial"?"hidden":"auto",children:k})}const Le=o.memo(s=>{let{contentAfter:e,index:n,initialValueTemplates:t=[],menuItemGroups:a=[],menuItems:u=[],setLayout:i,setSortOrder:l,title:c}=s;const{features:h}=Ct(),{collapsed:S,isLast:f}=pe(),I=f&&!S?-1:0,R=o.useMemo(()=>({setLayout:m=>{let{layout:y}=m;i(y)},setSortOrder:m=>{l(m)}}),[i,l]);return r(ke,{actions:r(Ne,{initialValueTemplateItems:t,actionHandlers:R,menuItemGroups:a,menuItems:u}),backButton:h.backButton&&n>0&&r(he,{as:je,"data-as":"a",icon:Be,mode:"bleed"}),contentAfter:e,tabIndex:I,title:c})});Le.displayName="DocumentListPaneHeader";function Yt(s){const{client:e,schema:n,sort:t,limit:a,params:u,filter:i,searchQuery:l,staticTypeNames:c}=s,h=t.by,S=t==null?void 0:t.extendedProjection,f=St(()=>e.listen("*[".concat(i,"]"),u,{events:["welcome","mutation","reconnect"],includeResult:!1,visibility:"query"})).pipe(X((m,y)=>y===0&&m.type!=="welcome"?J(()=>new Error(m.type==="reconnect"?"Could not establish EventSource connection":'Received unexpected type of first event "'.concat(m.type,'"'))):z(m)),It()),[I,R]=bt(f,m=>m.type==="welcome");return Se(I.pipe(Ie(1)),R.pipe(vt(1e3,_t,{leading:!0,trailing:!0}))).pipe(Lt(()=>(c?z(c):e.observable.fetch("array::unique(*[".concat(i,"][]._type)"),u)).pipe(X(y=>{const E=y.flatMap(_=>n.get(_)||[]),P={filter:i,query:l||"",types:E},p={__unstable_extendedProjection:S,comments:["findability-source: ".concat(l?"list-query":"list")],limit:a,params:u,sort:h},{query:T,params:b}=wt(P,p);return e.observable.fetch(T,b)}))))}const zt=[],me={error:null,onRetry:void 0,result:null},Ut={result:null,error:null};function Vt(s){const{filter:e,params:n,sortOrder:t,searchQuery:a}=s,u=ot(it),i=te(),[l,c]=o.useState(me),{onRetry:h,error:S,result:f}=l,I=f==null?void 0:f.documents,R=o.useMemo(()=>I?Ot(I):zt,[I]),[m,y]=o.useState(!1),[E,P]=o.useState(!1),[p,T]=o.useState(!1),b=o.useMemo(()=>ve(e,n),[e,n]),_=f===null&&!S,w=(I==null?void 0:I.length)===Z,F=o.useCallback(()=>{_||E||p||T(!0)},[_,E,p]),x=o.useCallback(d=>{var A,C;if(d.error){c(d);return}const O=((C=(A=d.result)==null?void 0:A.documents)==null?void 0:C.length)||0;if(!d.error&&(d==null?void 0:d.result)===null&&p){y(!0);return}if(O<de&&O!==0&&!p&&P(!0),(d==null?void 0:d.result)===null){c(v=>({...v.error?d:v}));return}y(!1),c(d)},[p]),k=o.useMemo(()=>{const d=new ct,A=()=>d.next();return Yt({client:u,filter:e,limit:p?Z:de,params:n,schema:i,searchQuery:a||"",sort:t||be,staticTypeNames:b?[b]:void 0}).pipe(ge(L=>({result:{documents:L},error:null})),lt(Ut),se(L=>L instanceof ProgressEvent?J(()=>new Error("Request error")):J(()=>L)),se((L,v)=>Tt(z({result:null,error:L}),Se(Rt(window,"online"),d).pipe(Ie(1),X(()=>v)))),ut((L,v)=>({...L,...v,onRetry:A})))},[u,e,n,i,a,p,t,b]);o.useEffect(()=>{const d=k.subscribe(x);return()=>{d.unsubscribe()}},[x,k]);const g=o.useCallback(()=>{P(!1),y(!1),c(me),T(!1)},[]);return o.useEffect(()=>{g()},[g,e,n,t,a]),{error:S,hasMaxItems:w,isLazyLoading:m,isLoading:_,isSearchReady:!S,items:R,onListChange:F,onRetry:h}}const ee=[],Ht=$e(ce||(ce=$([`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`]))),Gt=U(Qe)(le||(le=$([`
  animation: `,` 500ms linear infinite;
`])),Ht),Kt=U(fe)(ue||(ue=$([`
  [data-ui='TextInput'] {
    border-radius: inherit;
  }
`])));function Xt(s){const e=o.useRef(s);return dt(e.current,s)||(e.current=s),e.current}const Jt=s=>{const{menuItems:e,sortOrderRaw:n,layout:t}=s;return e==null?void 0:e.map(a=>{var u,i,l,c;return(u=a.params)!=null&&u.layout?{...a,selected:t===((i=a.params)==null?void 0:i.layout)}:(l=a==null?void 0:a.params)!=null&&l.by?{...a,selected:mt(n==null?void 0:n.by,((c=a==null?void 0:a.params)==null?void 0:c.by)||ee)}:{...a,selected:!1}})},sn=o.memo(function(e){const{childItemId:n,index:t,isActive:a,isSelected:u,pane:i,paneKey:l}=e,c=te(),{name:h}=qe(),{defaultLayout:S="default",displayOptions:f,initialValueTemplates:I=ee,menuItemGroups:R,menuItems:m,options:y,title:E}=i,{apiVersion:P,defaultOrdering:p=ee,filter:T}=y,b=Xt(y.params||At),_=i.source,w=o.useMemo(()=>ve(T,b),[T,b]),F=(f==null?void 0:f.showIcons)!==!1,[x,k]=ae(w,"layout",S),[g,d]=o.useState(""),[A,C]=o.useState(""),[O,L]=o.useState(null),v=o.useRef(!1),Q=o.useMemo(()=>(p==null?void 0:p.length)>0?{by:p}:be,[p]),[M,V]=ae(w,"sortOrder",Q),Te=w&&M?Ft(M,c.get(w)):M,Re=We(Te),Ee=Dt(T),{error:_e,hasMaxItems:we,isLazyLoading:Ce,isLoading:N,isSearchReady:Pe,items:H,onListChange:xe,onRetry:Ae}=Vt({apiVersion:P,filter:T,params:b,searchQuery:g==null?void 0:g.trim(),sortOrder:Re}),Oe=o.useMemo(()=>Jt({menuItems:m,sortOrderRaw:M,layout:x}),[x,m,M]),Me=Ye(q=>q.pipe(ge(G=>G.target.value),re(C),pt(G=>G===""?z(""):Et(300)),re(d)),[]),j=o.useCallback(()=>{d(""),C("")},[]),De=o.useCallback(q=>{q.key==="Escape"&&j()},[j]);o.useEffect(()=>(v.current===!1&&!N&&(v.current=!0),()=>{v.current=!1}),[N]),o.useEffect(()=>{j(),v.current=!1},[l,j]);const ne=o.useMemo(()=>N&&H.length===0&&v.current?"spinner":"initial",[N,H.length]),Fe=r(D,{paddingX:2,paddingBottom:2,children:r(Kt,{radius:4,tone:"transparent",children:r(ht,{"aria-label":"Search list",autoComplete:"off",border:!1,clearButton:Boolean(g),disabled:!Pe,fontSize:[2,2,1],icon:ne==="spinner"?Gt:ft,onChange:Me,onClear:j,onKeyDown:De,placeholder:"Search list",radius:2,ref:L,spellCheck:!1,value:A})})});return r(ze,{name:_||h,children:B(Ue,{currentMaxWidth:350,"data-ui":"DocumentListPane",id:l,maxWidth:640,minWidth:320,selected:u,children:[Ve,r(Le,{contentAfter:Fe,index:t,initialValueTemplates:I,menuItemGroups:R,menuItems:Oe,setLayout:k,setSortOrder:V,title:E}),r(Wt,{childItemId:n,error:_e,filterIsSimpleTypeConstraint:Ee,hasMaxItems:we,hasSearchQuery:Boolean(g),isActive:a,isLazyLoading:Ce,isLoading:N,items:H,layout:x,loadingVariant:ne,onListChange:xe,onRetry:Ae,searchInputElement:O,showIcons:F},l)]})})});export{sn as default};
