(this["webpackJsonpthree-spatial-controls"]=this["webpackJsonpthree-spatial-controls"]||[]).push([[0],{34:function(e,t,n){},35:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var i={};n.r(i),n.d(i,"default",(function(){return V}));var r={};n.r(r),n.d(r,"default",(function(){return ve}));var o={};n.r(o),n.d(o,"default",(function(){return je}));var a={};n.r(a),n.d(a,"Basic",(function(){return i})),n.d(a,"XRBasic",(function(){return r})),n.d(a,"MoneyFlow",(function(){return o}));var d,s,l,c,u,p,w,f,h,v=n(3),g=n.n(v),b=n(26),m=n.n(b),y=(n(34),n(15)),x=(n(35),n(0)),j=n(28),M=n(21),S=n(27),L=n(5),O={multipliedScalar:3,teleport:function(){}};M.a.install({THREE:x});var C=new x.Clock,B=new x.Vector3,D=new x.Vector3,E=new x.Vector3,W=new x.Vector3,z=new x.Quaternion;function G(){var e=new x.BufferGeometry;return e.setAttribute("position",new x.Float32BufferAttribute([0,0,0,1,1,1],3)),e}var P=new x.MeshBasicMaterial({depthTest:!1,depthWrite:!1,transparent:!0,side:x.DoubleSide,fog:!1,toneMapped:!1}),H=new x.Line(G(),P),R=new x.Line(G(),P);function V(){var e=Object(v.useRef)(),t=Object(v.useRef)();function n(){requestAnimationFrame(n),d.rotation.x+=.01,d.rotation.y+=.01;var e=C.getDelta();u.update(e),h.dragging&&(H.visible=!0,R.visible=!0,p.getWorldPosition(B),w.getWorldPosition(D),W.subVectors(D,B),W.multiplyScalar(O.multipliedScalar),f.position.copy(W.add(d.position)),p.getWorldQuaternion(z),H.position.copy(B),W.set(1e-10,1e-10,1e-10).add(D).sub(B),H.scale.copy(W),R.position.copy(d.position),W.set(1e-10,1e-10,1e-10).add(d.position).sub(f.position).multiplyScalar(-1),R.scale.copy(W)),c.render(s,l)}function i(){E=W.subVectors(D,B),d.position.add(E.multiplyScalar(O.multipliedScalar))}return Object(v.useEffect)((function(){!function(){(s=new x.Scene).background=new x.Color("skyblue"),l=new x.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),(c=new x.WebGLRenderer({antialias:!0,canvas:t.current})).setSize(window.innerWidth,window.innerHeight);var e=new x.BoxGeometry(1,1,1),n=new x.MeshNormalMaterial;d=new x.Mesh(e,n),s.add(d),l.position.z=5,u=new M.a(l,c.domElement),(p=new x.Mesh(new x.SphereBufferGeometry(1,100,100),n)).position.set(0,1,0),s.add(p),(w=new x.Mesh(new x.SphereBufferGeometry(1,100,100),n)).position.set(3,3,3),s.add(w),s.add(new x.AxesHelper(10)),(h=new j.a(l,c.domElement)).addEventListener("dragging-changed",(function(e){u.enabled=!e.value,H.visible=!H.visible,R.visible=!R.visible})),h.attach(w),s.add(h),s.add(l);var i=new x.BoxGeometry(1,1,1),r=new x.MeshNormalMaterial({wireframe:!0});f=new x.Mesh(i,r),s.add(f),s.add(H),s.add(R)}(),n(),O.teleport=i;var e=new S.a;e.open(),e.add(O,"multipliedScalar"),e.add(O,"teleport")}),[]),Object(L.jsx)("div",{ref:e,children:Object(L.jsx)("canvas",{ref:t})})}var F,A,k,T,q,I,N,Q,J,X,U,Z,K=n(16),Y=n(17),$=new x.Vector3,_=new x.Vector3,ee=new x.Vector3,te=new x.Vector3,ne=new x.Quaternion,ie={multipliedScalar:3,teleport:function(){}};function re(){var e=new x.BufferGeometry;return e.setAttribute("position",new x.Float32BufferAttribute([0,0,0,1,1,1],3)),e}var oe,ae,de,se,le,ce,ue,pe,we=new x.MeshBasicMaterial({depthTest:!1,depthWrite:!1,transparent:!0,side:x.DoubleSide,fog:!1,toneMapped:!1}),fe=new x.Line(re(),we),he=new x.Line(re(),we);function ve(){var e=Object(v.useRef)(),t=Object(v.useRef)(),n=Object(v.useRef)();function i(){F.aspect=window.innerWidth/window.innerHeight,F.updateProjectionMatrix(),k.setSize(window.innerWidth,window.innerHeight)}function r(e){e.userData.isSelecting}function o(){r(T),r(q),U.rotation.x+=.01,U.rotation.y+=.01,fe.visible=!0,Q.getWorldPosition($),J.getWorldPosition(_),te.subVectors(_,$),te.multiplyScalar(ie.multipliedScalar),Z.position.copy(te.add(U.position)),Q.getWorldQuaternion(ne),fe.position.copy($),te.set(1e-10,1e-10,1e-10).add(_).sub($),fe.scale.copy(te),he.position.copy(U.position),te.set(1e-10,1e-10,1e-10).add(U.position).sub(Z.position).multiplyScalar(-1),he.scale.copy(te),k.render(A,F)}return Object(v.useEffect)((function(){!function(){(A=new x.Scene).background=new x.Color(4210752),A.fog=new x.Fog(A.background,10,15),(F=new x.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,20)).position.set(0,1.6,0);var e=new x.Color(5263440);(X=new x.GridHelper(20,40,e,e)).geometry.translate(0,-.01,0),A.add(X),A.add(new x.HemisphereLight(6316128,4210752));var r=new x.DirectionalLight(16777215);function o(){this.userData.isSelecting=!0,console.log(this)}function a(){this.userData.isSelecting=!1,console.log(this),ee=te.subVectors(_,$),U.position.add(ee.multiplyScalar(ie.multipliedScalar))}function d(){console.log("moved")}function s(){ie.multipliedScalar++,console.log(ie.multipliedScalar)}function l(){ie.multipliedScalar--,console.log(ie.multipliedScalar)}r.position.set(1,1,1).normalize(),A.add(r),(k=new x.WebGLRenderer({antialias:!0,canvas:t.current})).xr.enabled=!0,k.setPixelRatio(window.devicePixelRatio),k.setSize(window.innerWidth,window.innerHeight),k.xr.setFramebufferScaleFactor(2),n.current.appendChild(K.a.createButton(k)),(T=k.xr.getController(0)).addEventListener("selectstart",o),T.addEventListener("selectend",a),T.addEventListener("select",d),T.addEventListener("squeezestart",s),A.add(T),(q=k.xr.getController(1)).addEventListener("selectstart",o),q.addEventListener("selectend",a),q.addEventListener("squeezestart",l),A.add(q);var c=new Y.a;(I=k.xr.getControllerGrip(0)).add(c.createControllerModel(I)),A.add(I),(N=k.xr.getControllerGrip(1)).add(c.createControllerModel(N)),A.add(N),window.addEventListener("resize",i,!1),(Q=new x.Mesh(new x.SphereBufferGeometry(.05,100,100),new x.MeshStandardMaterial({color:"green"}))).position.set(0,.05,0),q.add(Q),(J=new x.Mesh(new x.SphereBufferGeometry(.05,100,100),new x.MeshStandardMaterial({color:"yellow"}))).position.set(0,.05,0),T.add(J),A.add(fe),A.add(he);var u=new x.BoxGeometry(1,1,1),p=new x.MeshNormalMaterial;U=new x.Mesh(u,p),A.add(U);var w=new x.BoxGeometry(1,1,1),f=new x.MeshNormalMaterial({wireframe:!0});Z=new x.Mesh(w,f),A.add(Z)}(),k.setAnimationLoop(o)}),[]),Object(L.jsxs)("div",{ref:e,children:[Object(L.jsx)("canvas",{ref:t}),Object(L.jsx)("div",{ref:n})]})}var ge,be=0,me=1e3,ye=[],xe=new x.Clock;function je(){var e=Object(v.useRef)();function t(){oe.aspect=window.innerWidth/window.innerHeight,oe.updateProjectionMatrix(),de.setSize(window.innerWidth,window.innerHeight)}function n(e){if(e.userData.isSelecting){var t=ye[be++];t.position.copy(e.position),t.quaternion.copy(e.quaternion);var n=t.userData.velocity;n.x=r(),n.y=r()+.5,n.z=Math.random()-9,n.applyQuaternion(e.quaternion),t.userData.noise=.1*r(),be===ye.length&&(be=0)}}function i(){n(se),n(le);for(var e=.6*xe.getDelta(),t=0;t<ye.length;t++){var i=ye[t],r=i.userData,o=r.velocity;i.position.x+=o.x*e,i.position.y+=o.y*e,i.position.z+=o.z*e,i.rotation.x*=.99,i.rotation.z*=.99,i.position.y<=0&&(i.position.y=0,o.x*=.85,o.y=0,o.z*=.85);var a=.1*i.position.y;a>0&&(o.x+=r.noise*a,o.y-=9.8*e,o.z+=r.noise*a,i.rotation.y+=r.noise*a),i.updateMatrix(),ge.setMatrixAt(t,i.matrix)}ge.instanceMatrix.needsUpdate=!0,de.render(ae,oe)}function r(){return Math.random()-.5}return Object(v.useEffect)((function(){!function(){(ae=new x.Scene).background=new x.Color(4210752),ae.fog=new x.Fog(ae.background,10,15),(oe=new x.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,20)).position.set(0,1.6,0);var n=new x.Color(5263440);(pe=new x.GridHelper(20,40,n,n)).geometry.translate(0,-.01,0),ae.add(pe),ae.add(new x.HemisphereLight(6316128,4210752));var i=new x.DirectionalLight(16777215);i.position.set(1,1,1).normalize(),ae.add(i);var o=new x.PlaneBufferGeometry(.2,.09);o.rotateZ(Math.PI/2),o.rotateX(-Math.PI/2);var a=(new x.TextureLoader).load("textures/bill2.png"),d=new x.MeshBasicMaterial({map:a,side:x.DoubleSide});(ge=new x.InstancedMesh(o,d,me)).frustumCulled=!1,pe.add(ge);for(var s=0;s<me;s++){var l=new x.Object3D;l.position.x=8*r(),l.position.y=6*Math.random(),l.position.z=8*r(),l.rotation.y=r()*Math.PI*2,l.userData.velocity=new x.Vector3,l.userData.velocity.x=.01*r(),l.userData.velocity.y=.01*r(),l.userData.velocity.z=.01*r(),l.userData.noise=.1*r(),ye.push(l)}function c(){this.userData.isSelecting=!0}function u(){this.userData.isSelecting=!1}(de=new x.WebGLRenderer({antialias:!0})).xr.enabled=!0,de.setPixelRatio(window.devicePixelRatio),de.setSize(window.innerWidth,window.innerHeight),e.current.appendChild(de.domElement),document.body.appendChild(K.a.createButton(de)),(se=de.xr.getController(0)).addEventListener("selectstart",c),se.addEventListener("selectend",u),ae.add(se),(le=de.xr.getController(1)).addEventListener("selectstart",c),le.addEventListener("selectend",u),ae.add(le);var p=new Y.a;(ce=de.xr.getControllerGrip(0)).add(p.createControllerModel(ce)),ae.add(ce),(ue=de.xr.getControllerGrip(1)).add(p.createControllerModel(ue)),ae.add(ue),window.addEventListener("resize",t,!1)}(),de.setAnimationLoop(i)}),[]),Object(L.jsx)("div",{ref:e})}var Me=n(22),Se=n(6),Le=Object.entries(a);var Oe=function(){return Object(L.jsx)(Me.a,{children:Object(L.jsx)("div",{style:{height:"100vh"},className:"App",children:Object(L.jsxs)(Se.c,{children:[Le.map((function(e){var t=Object(y.a)(e,2),n=t[0],i=t[1];if(i.default){var r=i.default;return Object(L.jsx)(Se.a,{exact:!0,path:"/".concat(n),children:Object(L.jsx)(r,{})},n)}return null})),Object(L.jsxs)(Se.a,{exact:!0,path:"/",children:[Object(L.jsx)("h1",{style:{marginTop:0},children:"LAB"}),Le.map((function(e){var t=Object(y.a)(e,2),n=t[0];return t[1].default?Object(L.jsx)("div",{children:Object(L.jsx)(Me.b,{to:"/".concat(n),children:n})},n):null}))]})]})})})},Ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),i(e),r(e),o(e),a(e)}))};m.a.render(Object(L.jsx)(g.a.StrictMode,{children:Object(L.jsx)(Oe,{})}),document.getElementById("root")),Ce()}},[[43,1,2]]]);
//# sourceMappingURL=main.37c59f6f.chunk.js.map