# 未決定事項

> 優先度: 🔴 実装前に決定必要、🟡 実装中に決定、🟢 後回しOK

---

## 🔴-001: PK の ID 戦略

auto-increment vs CUID2 vs UUID v7。ER図では CUID2 を仮置きしている。

| 選択肢 | メリット | デメリット |
| ------ | -------- | ---------- |
| CUID2 | 推測困難、ソート可能、短い、datacore での実績 | ライブラリ依存 |
| UUID v7 | 標準仕様、ソート可能 | 文字列長い（36文字） |

---

## 🔴-002: Cloudflare Pages + Next.js の制約確認

@opennextjs/cloudflare で以下が動作するか検証が必要:
- Server Actions（ファイルアップロード含む）
- ISR / On-demand Revalidation
- Middleware（認証チェック等）
- Image Optimization

問題があれば DD-004 のフォールバック（Vercel）を発動。

---

## 🟡-003: 画像アップロードフロー

S3 への画像アップロード方式:
- A: クライアント → Server Action → S3（サーバー経由）
- B: クライアント → Presigned URL → S3（直接アップロード）

B の方がサーバー負荷は低いが、Cloudflare Workers のリクエストサイズ制限に注意。

---

## 🟡-004: 検索機能の実装方式

旧版は Laravel 側で SQL クエリを組み立てていた。新版の選択肢:
- A: Drizzle ORM でクエリビルド（Server Components から直接）
- B: Supabase の Full-Text Search（PostgreSQL の GIN インデックス）

初期は A で実装し、パフォーマンス問題があれば B に移行。

---

## 🟡-005: item_specs の Zod スキーマ設計

カテゴリごとにどの spec キーを許可するか。具体的なキー一覧は実装時に決定。
DB CHECK 制約の許可リストもこれに連動する。

---

## 🟢-006: 商品データの初期投入方法

旧版のデータ移行 or スクレイピング or 手動登録。
初期リリースではサンプルデータで対応し、後日検討。
