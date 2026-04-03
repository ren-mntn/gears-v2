# 設計判断記録

> SSOT: 仕様と実装の意図的な乖離の記録。

---

## DD-001: バックエンドを Next.js に統合（Laravel 廃止）

- **日付**: 2026-04-04
- **対象**: アーキテクチャ全体
- **判断**: 旧版の Laravel API サーバーを廃止し、Next.js App Router の Server Actions + Route Handlers で代替
- **理由**: 個人開発で 2 リポジトリ管理は運用コストが高い。App Router の RSC + Server Actions で API レイヤーが不要になった
- **トレードオフ**: 複雑なバックエンドロジックの分離が難しくなるが、本アプリの規模では問題にならない

---

## DD-002: 認証を Supabase Auth に委任（自前 JWT 廃止）

- **日付**: 2026-04-04
- **対象**: 認証・ユーザー管理
- **判断**: 旧版の tymon/jwt-auth による自前 JWT 実装を廃止し、Supabase Auth を使用
- **理由**: パスワードハッシュ・トークンリフレッシュ・セッション管理をマネージドサービスに委任。セキュリティリスクの低減
- **備考**: users テーブルは Supabase Auth の auth.users を参照。プロフィール等の追加情報は profiles テーブルで管理

---

## DD-003: 画像ストレージに AWS S3 + CloudFront を採用

- **日付**: 2026-04-04
- **対象**: 画像アップロード・配信
- **判断**: Supabase Storage ではなく AWS S3 + CloudFront を使用
- **理由**: AWS 経験のポートフォリオとしてのアピール。CDN 配信によるパフォーマンス。Supabase Storage は無料枠が限られる
- **トレードオフ**: インフラ管理の複雑さが増す

---

## DD-004: Cloudflare Pages にデプロイ（@opennextjs/cloudflare）

- **日付**: 2026-04-04
- **対象**: デプロイ先
- **判断**: Vercel ではなく Cloudflare Pages を使用
- **理由**: 無料枠が大きい。エッジ実行で高速。Cloudflare の学習価値
- **リスク**: @opennextjs/cloudflare は発展途上。Next.js の一部機能に制約がある可能性
- **フォールバック**: 問題が深刻な場合は Vercel に切り替え可能

---

## DD-005: ORM に Drizzle を採用（Prisma 不採用）

- **日付**: 2026-04-04
- **対象**: データアクセス層
- **判断**: Drizzle ORM を使用
- **理由**: Edge Runtime 対応。SQL に近い書き味で学習コスト低。バンドルサイズが軽量。datacore プロジェクトでの使用実績あり

---

## DD-006: イミュータブルデータモデルの採用

- **日付**: 2026-04-04
- **対象**: データモデル全体
- **判断**: 川島式イミュータブルデータモデルを採用。テーブルをリソース/コンタクト/イベントに分類
- **理由**: 履歴追跡・監査性の確保、データ整合性の担保。null が暗黙の UPDATE を前提とする設計を排除
- **参考**: https://scrapbox.io/kawasima/イミュータブルデータモデル

---

## DD-007: カテゴリ・タグの統合（tags テーブル）

- **日付**: 2026-04-04
- **対象**: 旧版の categories, sub_categories, item_tags, color_tags
- **判断**: tags テーブルに統合。tag_type（category / color / feature）で区別、parent_id で階層表現
- **理由**: 旧版は 2 階層固定で柔軟性がなく、タグ種別ごとにテーブルが増殖していた。統合により 4 テーブル → 1 テーブルに削減

---

## DD-008: 商品スペックを item_specs（イベント）+ JSONB で管理

- **日付**: 2026-04-04
- **対象**: 旧版の item_attributes（EAV）
- **判断**: item_specs テーブル（INSERT ONLY）に specs: jsonb で格納。items テーブルにはスペックを持たない
- **理由**:
  - nullable カラムは UPDATE を前提とする → イミュータブル違反
  - JSONB ならキーの有無が「この事実を知っている」の表明になる
  - item_specs をイベントにすることで変更履歴が自動的に残る
- **堅牢性**: TypeScript 型 + Zod バリデーション + DB CHECK 制約の 3 層防御

---

## DD-009: お気に入りをコンタクト（複合PK）で管理

- **日付**: 2026-04-04
- **対象**: favorite_items, favorite_layouts
- **判断**: イベント（INSERT ONLY + action: ADD/REMOVE）ではなく、複合PK のコンタクトテーブルで管理。DELETE で解除
- **理由**: お気に入りの追加/解除履歴を保持する必要がない。「今どうか」だけが重要

---

## DD-010: 閲覧履歴テーブル（view_events）の廃止

- **日付**: 2026-04-04
- **対象**: 旧版の view_item_histories, view_layout_histories
- **判断**: 閲覧記録テーブルを作らない
- **理由**: アクセスのたびに INSERT するとデータ量が爆発する。閲覧数が必要なら Analytics サービスに委任するか、カウンターカラムで対応
