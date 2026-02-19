## BANNER PHƯƠNG THẢO ƯỚC THỆ - Guarantee S-rank Character - Alice Thymefield
![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Language](https://img.shields.io/badge/Language-Vietnamese-red)
![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)

A big update **2.0** after 1.0 release a few days ago (add more effects, fix logic bugs, add sound effects & music)

---

# 🎰 Gacha System Logic

This project simulates a Gacha banner (Zenless Zone Zero style) using JavaScript. Below is the breakdown of the internal logic.

## 📊 Probabilities & Ranks
The system generates a random number `randomNV` (0-100) for every pull:

* **S-Rank** (`randomNV ≤ 1`): **~1% chance**.
    * *Reward:* **Alice** (Banner Character) or Standard S-Rank Characters.
* **A-Rank** (`2 ≤ randomNV ≤ 10`): **~9% chance**.
    * *Reward:* Anby, Sett, Nicole.
* **B-Rank** (`randomNV > 10`): **~90% chance**.
    * *Reward:* W-Engines (Kiếm Súng, Tương Cà, etc.).

---

## 🛡️ Pity System (Bảo Hiểm)

The system tracks your luck using a `pity` counter stored in the browser's **LocalStorage**.

### 1. Hard Pity
* **Threshold:** If `pity >= 90`.
* **Effect:** The next pull is guaranteed to be an **S-Rank** character, regardless of the random number generation.
* **Reset:** The `pity` counter resets to 0 immediately after obtaining any S-Rank.

### 2. Early Luck Mechanism
* The code includes a specific check for "Early Luck" (`pity <= 20`).
* If you hit an S-Rank within the first 20 pulls, it triggers a special "NỔ SỚM" (Early Pop) message.

---

## ⚖️ 50/50 & Guarantee Logic

When an S-Rank is pulled (either via luck or Hard Pity), the **50/50 logic** applies:

1.  **Check Guarantee Status:**
    * If `guarantee` is **TRUE**: You get **Alice** (100%).
    * *Result:* `guarantee` resets to `false`.

2.  **50/50 Roll (If no guarantee):**
    * The system rolls a 50% chance (`Math.random() < 0.5`).
    * **WIN:** You get **Alice**.
    * **LOSE:** You get a Standard S-Rank (Lycaon, Rina, etc.).
        * *Result:* `guarantee` is set to **TRUE** (Next S-Rank is guaranteed to be Alice).

---

## 💾 Data Persistence
* **LocalStorage:** The `pity` count and `guarantee` (boolean) status are saved to the browser.
* This ensures your pull history is preserved even if you refresh or close the page.

## 🔊 Audio & Visuals
* **Sound Effects:** Distinct sounds for Clicking, S-Rank reveal, Winning 50/50 (Chiu), and Losing 50/50 (Sad).
* **Click-to-Reveal:** S-Rank results are initially hidden ("S-Rankkkk!"). The user must click the text to reveal the character and trigger the win/loss sound.


