import{a as r,b as c,c as s,d as o,e as a,f as d,g as p,h as u,k as v,n as l,o as g}from"./chunk-ADZOOJ53.js";var h=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r({type:e,selectors:[["app-color"]],standalone:!0,features:[p],decls:2,vars:0,template:function(t,m){t&1&&(s(0,"p"),d(1,"color works!"),o())}});let i=e;return i})();var y=(()=>{let e=class e{constructor(n){this.pokeApiService=n}ngOnInit(){this.pokeApiService.addSpecies()}};e.\u0275fac=function(t){return new(t||e)(c(l))},e.\u0275cmp=r({type:e,selectors:[["app-species"]],standalone:!0,features:[p],decls:1,vars:0,template:function(t,m){t&1&&a(0,"app-color")},dependencies:[h]});let i=e;return i})();var x=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r({type:e,selectors:[["app-filters"]],standalone:!0,features:[p],decls:10,vars:0,consts:[[1,"panel"],[1,"filter"],[1,"filter__title"]],template:function(t,m){t&1&&(s(0,"div",0)(1,"div",1),a(2,"app-search-box"),o(),s(3,"div",1)(4,"h1",2),d(5,"Type"),o()(),s(6,"div",1)(7,"h1",2),d(8,"Species"),o(),a(9,"app-species"),o()())},dependencies:[g,y],styles:["div.panel[_ngcontent-%COMP%]{width:20vw;padding:10px;background-color:red;height:100vh}"]});let i=e;return i})();var C=(()=>{let e=class e{constructor(n,t){this.pokiApi=n,this.activeRoute=t,this.list$=this.pokiApi.gridStore,u(()=>console.log(this.list$()))}ngOnInit(){this.activeRoute.queryParams.subscribe(n=>{this.pokiApi.listPokemon({name:"c"},{types:"ground"})})}};e.\u0275fac=function(t){return new(t||e)(c(l),c(v))},e.\u0275cmp=r({type:e,selectors:[["app-grid"]],standalone:!0,features:[p],decls:16,vars:0,consts:[[1,"grid"]],template:function(t,m){t&1&&(s(0,"div",0),a(1,"section")(2,"section")(3,"section")(4,"section")(5,"section")(6,"section")(7,"section")(8,"section")(9,"section")(10,"section")(11,"section")(12,"section")(13,"section")(14,"section")(15,"section"),o())},styles:[".grid[_ngcontent-%COMP%]{background-color:#00f;height:100vh;width:80vw;padding-top:50px;padding-bottom:50px;display:grid;justify-content:center;overflow-y:scroll;grid-template-columns:repeat(4,250px);grid-template-rows:repeat(4,250px);column-gap:20px;row-gap:20px}.grid[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{background-color:green}"]});let i=e;return i})();var j=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r({type:e,selectors:[["app-pokemon"]],standalone:!0,features:[p],decls:3,vars:0,template:function(t,m){t&1&&(s(0,"main"),a(1,"app-filters")(2,"app-grid"),o())},dependencies:[x,C],styles:["main[_ngcontent-%COMP%]{display:flex}"]});let i=e;return i})();export{j as PokemonComponent};
