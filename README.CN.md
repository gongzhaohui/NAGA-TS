# NAGA-TS

## 项目名的含义

- [*N*est](https://github.com/nestjs/nest)
- [*A*ngular](https://github.com/angular/angular)
- [*G*raphql](https://github.com/nestjs/graphql)
- [*A*rangodb](https://github.com/arangodb/arangodb)
- [*T*ype*S*cript](https://github.com/Microsoft/TypeScript)

## 选择的理由

0. 迷恋 Javascript。愿意相信 Javascript 可以统一前后端和数据库。

1. 服务器端选择node。但是N不是Node的N，是Nest的N。Nest是一个架构类似Angular的node框架。作者原话[heavily inspired by Angular](https://github.com/nestjs/nest#description)。**Typescript**。
2. 客户端框架选择Angular。**Typescript**。考察了react和vue。react、graphql、relay本是同根生，react的component-render+jsx模式也很迷人，但relay与graphql的__generated__+createFragmentContainer结合方式却让人不敢恭维。vue，国人创建的人气框架，非常想认真的学习一下。但最终还是选择了Angular。喜欢它的结构性。很多人说Angular学习曲线陡，可能是指理解它的底层会很难。使用电脑的时候一定要弄懂底层API再用，使用Excel时一定要搞懂cell的数据结构和底层实现，可能没几个人能用得上电脑了，也没几个人会用Excel了。
3. 为什么要用Graphql。[graphql.cn](http://graphql.cn/)有一些解释。也许在你的脑海里也曾经闪现过：前端所有请求都提交给一个统一的服务接口，服务端分析请求给出相应。Graphql是这种想法的类型化产物。通过自省(introspection)告诉(限制)客户端可用的查询，前端查询简便化，overfetching、underfetching交给后端来做。可以期待出现一个原生支持graphql的数据库，那样服务端就只需把请求转发给数据库，然后再把响应发给前端，没有overfetching，没有underfetching，天下太平，皆大欢喜了。
4. 为什么是Arangodb。[官网](https://www.arangodb.com/why-arangodb/)有一些说明。似乎是性能不错的graph数据库。真正喜欢的是AQL，类javascript，像写存储过程一样写查询，比SQL灵活太多。针对graph的查询也可以作为解决递归查询的一个思路。可惜对它的视图（view）还是没有一个清晰的概念。<update 2018-9-13>arangodb发布3.4rc1，在webui上已出现view菜单。

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

客户端使用 [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1生成。
服务端使用 [Nest CLI](https://github.com/nestjs/nest-cli) version 5.4.0生成。

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
