# データモデル

> SSOT: リレーションの地図。カラム詳細・制約は Drizzle schema が正。
> ER図: [er-diagram.drawio](./er-diagram.drawio)

## 設計方針

[川島式イミュータブルデータモデル](https://scrapbox.io/kawasima/%E3%82%A4%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%BF%E3%83%96%E3%83%AB%E3%83%87%E3%83%BC%E3%82%BF%E3%83%A2%E3%83%87%E3%83%AB)を採用。テーブルを3種類に分類する。

| 種類 | 性質 | UPDATE | DELETE |
| ---- | ---- | :----: | :----: |
| リソース | マスタ系。登録時に確定する情報 | 原則しない | しない |
| コンタクト | リソース間の関連。複合PK | しない | OK（関連解除） |
| イベント | 事実の記録。INSERT ONLY | **禁止** | **禁止** |

## テーブル一覧

### リソース

| テーブル | 概要 | PK |
| -------- | ---- | -- |
| brands | ブランド（スノーピーク、コールマン等） | id: cuid2 |
| tags | 統合タグ。tag_type で分類（category / color / feature）。parent_id で階層表現 | id: cuid2 |
| profiles | ユーザープロフィール。auth_user_id で Supabase Auth と紐づけ | id: cuid2 |
| items | 商品。name, price, description, image_key のみ。スペックは item_specs に分離 | id: cuid2 |

### コンタクト

| テーブル | 概要 | PK |
| -------- | ---- | -- |
| item_tags | 商品×タグ | FK: item_id + tag_id |
| layout_items | レイアウト×商品。画像上の位置情報（position_x, position_y）を含む | FK: layout_id + item_id |
| user_inventories | ユーザー×所有商品（持ち物リスト） | FK: user_id + item_id |
| favorite_items | 商品のお気に入り | PK: user_id + item_id（複合PK） |
| favorite_layouts | レイアウトのお気に入り | PK: user_id + layout_id（複合PK） |

### イベント（INSERT ONLY）

| テーブル | 概要 | 備考 |
| -------- | ---- | ---- |
| layout_posts | レイアウト投稿。user_id, image_key, description | 投稿の事実を記録 |
| comment_events | コメント。action: POST / DELETE で論理削除 | DELETE イベントの INSERT で削除を表現 |
| item_specs | 商品スペック。specs: jsonb（Zod + DB CHECK 制約で堅牢性担保） | 最新 = 現在のスペック。変更履歴が自動的に残る |

## 旧版（GearsNext）からの主な変更

| 旧版 | 新版 | 理由 |
| ---- | ---- | ---- |
| categories + sub_categories（2階層固定） | tags（tag_type + parent_id で統合） | 柔軟な階層表現 |
| item_tags + color_tags + item_item_tag + item_color_tag | tags + item_tags に統合 | tag_type で区別。テーブル数削減 |
| item_attributes（EAV） | item_specs.specs: jsonb | 型安全（Zod）、キー制約（CHECK） |
| users | profiles + Supabase Auth | パスワード管理をマネージドに委任 |
| comments（CRUD） | comment_events（INSERT ONLY） | イミュータブル。削除も逆イベントで表現 |
| tag_positions + item_layout | layout_items に統合 | 位置情報と商品関連は同じ概念 |
| view_item_histories + view_layout_histories | 削除 | Analytics サービスに委任 |
| favorite_items / favorite_layouts（CRUD） | 複合PK のコンタクトテーブル | 履歴不要。現在の関連のみ管理 |

## JSONB スペック設計（item_specs.specs）

3層防御で堅牢性を担保:

1. **TypeScript 型**（コンパイル時）: Zod スキーマから型を導出
2. **Zod バリデーション**（ランタイム）: カテゴリ別スキーマで未定義キーを排除
3. **DB CHECK 制約**（最後の砦）: 許可されたキーのみ受け入れ

スキーマ定義の SSOT: `src/lib/specs/schema.ts`（実装時に作成）
