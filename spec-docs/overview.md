# プロジェクト概要

## 目的

キャンプギアの検索・レイアウト共有プラットフォーム「gears-v2」。
旧版 [GearsNext](https://github.com/ren-mntn/GearsNext) を現代的な技術スタックで再構築する。

## 背景

- 旧版は 2023 年にポートフォリオとして開発（Next.js 13 Pages Router + Laravel 9）
- フロントエンド・バックエンド分離構成で 2 リポジトリ管理だった
- 今回は App Router + Server Actions で 1 リポジトリに統合し、バックエンド不要の構成とする

## 主要機能

| 機能               | 概要                                                           |
| ------------------ | -------------------------------------------------------------- |
| 商品検索           | カテゴリ・タグ・色・価格帯によるフィルタ検索、オートコンプリート |
| 商品詳細           | 商品情報（価格・ブランド・サイズ等）、関連レイアウト表示        |
| レイアウト投稿     | キャンプ写真 + 使用商品のイメージマップを投稿                  |
| レイアウト詳細     | 投稿画像・イメージマップ・コメント表示                         |
| いいね・コメント   | 認証ユーザーによるレイアウト・商品へのリアクション              |
| ランキング         | 新着・いいね数・閲覧数による商品・レイアウトのランキング        |
| ユーザー管理       | 登録・ログイン・プロフィール・お気に入り・持ち物リスト          |
| 商品登録           | ユーザーによる新規商品データの登録                              |

## 技術スタック

| レイヤー    | 技術                          | 備考                                     |
| ----------- | ----------------------------- | ---------------------------------------- |
| Framework   | Next.js 15 (App Router)       | Server Components + Server Actions       |
| Language    | TypeScript 5                  | strict mode                              |
| UI          | shadcn/ui + Tailwind CSS v4   | Radix UI ベース                          |
| State       | Zustand（必要時のみ）         | Server Components 中心のため最小限       |
| Form        | React Hook Form + Zod         | バリデーション + 型推論                  |
| DB          | Supabase (PostgreSQL)         | 認証・ストレージも活用可能               |
| ORM         | Drizzle ORM                   | Edge Runtime 対応、SQL に近い書き味      |
| 認証        | Supabase Auth                 | マネージド認証                           |
| 画像Storage | AWS S3 + CloudFront           | CDN 配信、AWS 経験のアピール             |
| Deploy      | Cloudflare Pages              | @opennextjs/cloudflare 経由              |
| Lint/Format | Biome                         | ESLint + Prettier の統合代替             |
| Test        | Vitest + Testing Library      | 必要に応じて                             |
| Storybook   | Storybook 8                   | コンポーネントカタログ                   |

## スコープ

### スコープ内

- 旧版の全機能の再実装
- レスポンシブデザイン（モバイル対応）
- パフォーマンス最適化（SSG / ISR の活用）

### スコープ外

- ネイティブアプリ
- 管理画面（初期リリースでは不要）
- 決済機能
