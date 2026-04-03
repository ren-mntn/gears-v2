# spec-docs

LLM（Claude等）向けの仕様ドキュメント

## 読み順ガイド

| 目的               | 参照ファイル                                                    |
| ------------------ | --------------------------------------------------------------- |
| プロジェクト全体像 | [overview.md](./overview.md)                                    |
| ドメイン用語       | [glossary.md](./glossary.md)                                    |
| テーブル関連図     | [data-model.md](./data-model.md)（カラム詳細は Drizzle schema） |
| 設計判断の記録     | [design-decisions.md](./design-decisions.md)                    |
| 未決定の仕様       | [open-issues.md](./open-issues.md)                              |

## 原則

- **読者はLLM**。人間向けの装飾・冗長な説明は不要
- **SSOTはコード**。ER図はリレーションの地図、カラム詳細は Drizzle schema が正
- **仕様変更はここから**。「この箇所を変更して」→ Issue 作成
- **コードレビューの判定基準**。実装がこの仕様に合致しているか検証する
