import{a as r,b as m,c as p,d as o,e as a,f as c,g as s,l,m as u}from"./chunk-KJUFFOCQ.js";var v=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r({type:e,selectors:[["app-color"]],standalone:!0,features:[s],decls:2,vars:0,template:function(n,d){n&1&&(p(0,"p"),c(1,"color works!"),o())}});let t=e;return t})();var g=(()=>{let e=class e{constructor(i){this.pokeApiService=i}ngOnInit(){this.pokeApiService.addSpecies()}};e.\u0275fac=function(n){return new(n||e)(m(l))},e.\u0275cmp=r({type:e,selectors:[["app-species"]],standalone:!0,features:[s],decls:1,vars:0,template:function(n,d){n&1&&a(0,"app-color")},dependencies:[v]});let t=e;return t})();var h=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r({type:e,selectors:[["app-filters"]],standalone:!0,features:[s],decls:10,vars:0,consts:[[1,"panel"],[1,"filter"],[1,"filter__title"]],template:function(n,d){n&1&&(p(0,"div",0)(1,"div",1),a(2,"app-search-box"),o(),p(3,"div",1)(4,"h1",2),c(5,"Type"),o()(),p(6,"div",1)(7,"h1",2),c(8,"Species"),o(),a(9,"app-species"),o()())},dependencies:[u,g],styles:["div.panel[_ngcontent-%COMP%]{width:20vw;padding:10px;background-color:red;height:100vh}"]});let t=e;return t})();var x=(()=>{let e=class e{constructor(i){this.pokiApi=i}};e.\u0275fac=function(n){return new(n||e)(m(l))},e.\u0275cmp=r({type:e,selectors:[["app-grid"]],standalone:!0,features:[s],decls:16,vars:0,consts:[[1,"grid"]],template:function(n,d){n&1&&(p(0,"div",0),a(1,"section")(2,"section")(3,"section")(4,"section")(5,"section")(6,"section")(7,"section")(8,"section")(9,"section")(10,"section")(11,"section")(12,"section")(13,"section")(14,"section")(15,"section"),o())},styles:[".grid[_ngcontent-%COMP%]{background-color:#00f;height:100vh;width:80vw;padding-top:50px;padding-bottom:50px;display:grid;justify-content:center;overflow-y:scroll;grid-template-columns:repeat(4,250px);grid-template-rows:repeat(4,250px);column-gap:20px;row-gap:20px}.grid[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{background-color:green}"]});let t=e;return t})();var O=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r({type:e,selectors:[["app-pokemon"]],standalone:!0,features:[s],decls:3,vars:0,template:function(n,d){n&1&&(p(0,"main"),a(1,"app-filters")(2,"app-grid"),o())},dependencies:[h,x],styles:["main[_ngcontent-%COMP%]{display:flex}"]});let t=e;return t})();export{O as PokemonComponent};
