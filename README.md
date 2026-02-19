## BANNER PHƯƠNG THẢO ƯỚC THỆ - Guarantee S-rank Character - Alice Thymefield
![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Language](https://img.shields.io/badge/Language-Vietnamese-red)
![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)

A big update **2.0** after 1.0 release a few days ago (add more effects, fix logic bugs, add sound effects & music) 

🔗 **Live Demo:** https://huyoniichannuwu.github.io/ZZZ-Banner-System/
---

---
## ⚙️ Logic Gacha

Hệ thống sử dụng `Math.random()` và `localStorage` để xử lý xác suất:

## 🚀 Tính Năng Chính

* **Mô phỏng Gacha:** Quay nhân vật với hiệu ứng và logic thực tế.
* **Hệ thống Pity (Bảo hiểm):** Theo dõi số lần quay để đảm bảo ra nhân vật S-rank và A-rank.
* **Giao diện:** Thiết kế responsive cơ bản với HTML/CSS.

---

## 🧠 Giải Thích Logic Gacha (ZZZ Mechanics)

Dự án này sử dụng thuật toán giả lập xác suất (Probability Algorithm) bám sát theo cơ chế của Zenless Zone Zero. Dưới đây là cách code xử lý logic:

### 1. Tỷ Lệ Cơ Bản (Base Rates)
Hệ thống sử dụng `Math.random()` để sinh ra một số từ 0 đến 100 cho mỗi lần quay.

* **S-Rank (Tín Vật S):** Tỷ lệ gốc **0.6%**.
* **A-Rank (Tín Vật A):** Tỷ lệ gốc khoảng **5-6%**.
* **B-Rank:** Các trường hợp còn lại.

### 2. Cơ Chế Pity (Bảo Hiểm)
Biến đếm `pityCounter` được sử dụng để theo dõi số lần quay chưa ra S-rank:

* **Hard Pity (Bảo hiểm cứng):** Tại lần quay thứ **90**, nếu chưa ra S-rank, tỷ lệ trả về S-rank là **100%**.
* **Soft Pity (Bảo hiểm mềm):** Bắt đầu từ lần quay thứ **80**, tỷ lệ ra S-rank sẽ tăng đột biến (không còn là 0.6% mà tăng dần lên, ví dụ: 6% -> 12% -> 20%...) cho đến khi chạm 90.
* **A-Rank Pity:** Đảm bảo mỗi **10 lần quay** chắc chắn có ít nhất 1 đồ tím (A-rank).

### 3. Cơ Chế 50/50 (Rate Up)
Khi hệ thống xác định bạn nhận được S-rank, một biến kiểm tra `isGuaranteed` (bảo đảm) sẽ hoạt động:

1.  **Lần đầu ra S-rank:** Có **50%** tỷ lệ ra nhân vật Banner (Alice) và **50%** ra nhân vật thường (Lệch rate).
2.  **Nếu lệch rate:** Biến `isGuaranteed` được set thành `true`.
3.  **Lần sau ra S-rank:** Chắc chắn **100%** là nhân vật Banner (Alice). Sau đó `isGuaranteed` reset về `false`.
