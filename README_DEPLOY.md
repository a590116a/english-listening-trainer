# 英文聽力訓練部署說明

## 已準備好的內容

- 手機可用的靜態網頁版本
- GitHub Pages 部署工作流程
- 桌面 `.cmd` 啟動器

## 要變成可分享網址，需要做什麼

1. 把 `english-listening-trainer/` 和 `.github/workflows/deploy-english-listening-pages.yml` 推到 GitHub 的 `main`
2. 在 GitHub repository 的 Pages 設定裡，把來源設成 `GitHub Actions`
3. 等 Actions 跑完部署

## 部署後的網址

如果這個 repository 仍然是 `https://github.com/a590116a/test.git`，通常網址會是：

`https://a590116a.github.io/test/`

這個頁面內容會來自 `english-listening-trainer/`。

## 注意

- 我目前只把部署設定準備好，還沒有替你推上 GitHub
- 如果你要，我下一步可以繼續幫你檢查 Pages 設定、整理 commit，或直接協助推送
