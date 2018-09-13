# NAGA-TS

## 项目名的含义

- [*N*est](https://github.com/nestjs/nest)
- [*A*ngular](https://github.com/angular/angular)
- [*G*raphql](https://github.com/nestjs/graphql)
- [*A*rangodb](https://github.com/arangodb/arangodb)
- [*T*ype*S*cript](https://github.com/Microsoft/TypeScript)

## 选择的理由

0. 迷恋 Javascript。愿意相信 Javascript 可以统一前后端和数据库。

1. 服务器端选择 node。但是 N 不是 Node 的 N，是 Nest 的 N。Nest 是一个架构类似 Angular 的 node 框架。作者原话[heavily inspired by Angular](https://github.com/nestjs/nest#description)。**Typescript**。
1. 客户端框架选择 Angular。**Typescript**。考察了 react 和 vue。react、graphql、relay 本是同根生，react 的 component-render+jsx 模式也很迷人，但 relay 与 graphql 的**generated**+createFragmentContainer 结合方式却让人不敢恭维。vue，国人创建的人气框架，非常想认真的学习一下。但最终还是选择了 Angular。喜欢它的结构性。很多人说 Angular 学习曲线陡，可能是指理解它的底层会很难。使用电脑的时候一定要弄懂底层 API 再用，使用 Excel 时一定要搞懂 cell 的数据结构和底层实现，可能没几个人能用得上电脑了，也没几个人会用 Excel 了。
1. 为什么要用 Graphql。[graphql.cn](http://graphql.cn/)有一些解释。也许在你的脑海里也曾经闪现过：前端所有请求都提交给一个统一的服务接口，服务端分析请求给出相应。Graphql 是这种想法的类型化产物。通过自省(introspection)告诉(限制)客户端可用的查询，前端查询简便化，overfetching、underfetching 交给后端来做。可以期待出现一个原生支持 graphql 的数据库，那样服务端就只需把请求转发给数据库，然后再把响应发给前端，没有 overfetching，没有 underfetching，天下太平，皆大欢喜了。
1. 为什么是 Arangodb。[官网](https://www.arangodb.com/why-arangodb/)有一些说明。似乎是性能不错的 graph 数据库。真正喜欢的是 AQL，类 javascript，像写存储过程一样写查询，比 SQL 灵活太多。针对 graph 的查询也可以作为解决递归查询的一个思路。可惜对它的视图（view）还是没有一个清晰的概念。<update 2018-9-13>arangodb 发布 3.4rc1，在 webui 上已出现 view 菜单。

## 目录结构

```
Root
├─dist
│  ├─.bin
│  ├─browser
│  └─server
├─e2e
│  └─src
└─src
    ├─client
    │  ├─app
    │  └─assets
    ├─server
    └─shared
        └─environments
```

客户端使用 [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1 生成。
服务端使用 [Nest CLI](https://github.com/nestjs/nest-cli) version 5.4.0 生成。

## Development server

Run `ng serve` for a angular dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` for a node dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

`cd src\client`

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
