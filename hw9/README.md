# Web Programming HW#9
網址：https://wphw9-production-69b8.up.railway.app/
## 功能
和 hw6 中相同
### Clear
All data in DB will be cleared once it is clicked.
### Add
Data can be added when "name", "subject", and "score" are filled.
### Query
Data stored in DB can be queried by name or subject.
### Message Console
The adding, quering, clearing, and error message will be displayed here.
## Deployment 流程
1. 修改 hw6 中的 code（package.json, server.js, api.js 等）
2. 新增 dockerfile
3. setup a project on Railway
## 遇到的困難與解決方式
1. 路徑錯誤 $\rightarrow$ 更改路徑
2. 未在 Railway 設定 MONGO_URL 的 value $\rightarrow$ 將 db 路徑設成 value
