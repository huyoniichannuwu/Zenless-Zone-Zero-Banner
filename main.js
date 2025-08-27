var pity = parseInt(localStorage.getItem("pity")) || 0;
var guarantee = JSON.parse(localStorage.getItem("guarantee")) || false;

function savepity(randomNV){
    pity += 1;

    if (randomNV<= 1.0000 && pity <= 20){
        pity = 0;
        if (guarantee){   // Nếu đang có bảo hiểm
            guarantee = false;
            saveState();
            return {rank: "s-rank", text: "NỔ SỚM KÌAA! Alice: Nhân vật cấp S"};
        }

        let rate50 = Math.floor(Math.random() * 100);
        if (rate50 < 50){
            guarantee = false;
            saveState();
            return {rank: "s-rank", text: "NỔ SỚM KÌAA! Alice: Nhân vật cấp S"};
        } else {
            guarantee = true; // thua 50/50
            saveState();
            return {rank: "s-rank", text: `NỔ SỚM KÌA... ${randomSOther()}`};
        }
    }
    // Hard pity
    if (pity >= 90){
        pity = 0;
        if (guarantee){   // Nếu đang có bảo hiểm
            guarantee = false;
            saveState();
            return {rank: "s-rank", text: "HARD PITY! Alice: Nhân vật cấp S"};
        }

        let rate50 = Math.floor(Math.random() * 100);
        if (rate50 < 50){
            guarantee = false;
            saveState();
            return {rank: "s-rank", text: "HARD PITY! Alice: Nhân vật cấp S"};
        } else {
            guarantee = true; // thua 50/50
            saveState();
            return {rank: "s-rank", text: `HARD PITY! ${randomSOther()}`};
        }
    }

    // Random trúng S
    else if (randomNV <= 1.0000){
        pity = 0;
        if (guarantee){   // Nếu có bảo hiểm thì chắc chắn Alice
            guarantee = false;
            saveState();
            return { rank: "s-rank", text: "Alice: Nhân vật cấp S" };
        }

        let rate50 = Math.floor(Math.random() * 100);
        if (rate50 < 49){
            guarantee = false;
            saveState();
            return { rank: "s-rank", text: "Alice: Nhân vật cấp S" };
        } else {
            guarantee = true;
            saveState();
            return { rank: "s-rank", text: randomSOther() };
        }
    }
    

    saveState();
    return null;
}

function randomSOther(){
    let nvLechrate = [
        "Lycaon: Nhân vật cấp S",
        "Rina: Nhân vật cấp S",
        "Soldier 11: Nhân vật cấp S",
        "Koleda: Nhân vật cấp S",
        "Grace: Nhân vật cấp S",
        "Nekomata: Nhân vật cấp S"
    ];
    return nvLechrate[Math.floor(Math.random()*6)];
}

function spinBanner(){
    var randomNV = Math.floor(Math.random()*100)         //100 values
    let pityResult = savepity(randomNV);
    if (pityResult) return pityResult;

    if(randomNV >= 2 && randomNV <=10){
        let nv4s = ["Anby: Nhân vật cấp A","Sett: Nhân vật cấp A","Nicole: Nhân vật cấp A"];
        let pick = nv4s[Math.floor(Math.random()*nv4s.length)];
        return { rank: "a-rank", text: pick };
    } 
    else if(randomNV >10 &&randomNV <=100) {
        let vk3s = ["Kiếm Súng: W-Engine cấp B", "Tương Cà: W-Engine cấp B","Diệt Khổng Lồ: W-Engine cấp B"]
        let pick2 = vk3s[Math.floor(Math.random() * vk3s.length)]
        return { rank: "b-rank", text: pick2 };
    }
}


function roll(times){
    const sRankSound = document.getElementById("s-rank-sound");          //âm thanh S-rank
    sRankSound.pause();
    sRankSound.currentTime = 0;
    
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 


    for (let i=0; i<times; i++){
        const clickSound = document.getElementById("click-sound");
        let result = spinBanner();
        let p = document.createElement("p");
        p.className = "item " + result.rank;
        p.textContent = result.text;
        resultsDiv.appendChild(p);
        clickSound.play()
        if (result.rank === "s-rank") {
            
            p.classList.remove("s-rank-glow");
            p.classList.add("s-rank-glow"); //hiệu ứng ánh sáng ở đây nhé
            
            //Lưu kết quả vào dataset để khi click mới hiện
            p.dataset.revealText = result.text;
            p.textContent = "S-Rankkkk! NHẤN ĐỂ MỞ "; // ẩn nội dung
            
            sRankSound.currentTime = 0; // Đặt lại thời gian để có thể phát lại ngay nếu liên tiếp
            sRankSound.play().catch(e => console.log("Phát âm thanh thất bại:", e));
            
            // click để mở siuuuuu
            p.addEventListener("click", function () {
            this.classList.remove("s-rank-hidden");
            this.classList.add("s-rank-glow", "s-rank"); // hiệu ứng + màu chữ
            this.textContent = this.dataset.revealText;

            if(result.text.includes("Alice")){
                
                //trúng rate
                const chiuSound = document.getElementById("chiu-sound");
                chiuSound.currentTime = 0;
                chiuSound.play().catch(e => console.log("Phát âm thanh CHÍU thất bại:", e));
            } else {
                const sadSound = document.getElementById("sad-sound");               //âm thanh Lệch
                sadSound.currentTime = 0;
                sadSound.play().catch(e => console.log("Phát SAD thất bại"));
            }
        });
        }
    }
    
    
    //hien thi pity
    document.getElementById("pity").textContent = pity;
    localStorage.setItem("pity", pity);

    
}

function saveState(){
    localStorage.setItem("pity", pity);
    localStorage.setItem("guarantee", JSON.stringify(guarantee));
}

//nhạc


// //MENU
// console.log(`          ~Banner Phương Thảo Ước Thệ~
// Nhân vật cấp S (1.000%): Alice 
//     - Nhân vật up rate kỳ này: 'Alice' 50% tỉ lệ trúng
//     - 50% tỉ lệ còn lại sẽ trúng Nhân vật cấp S Khác`)
// console.log(`Items:
//     `)
// if(pity >=89){
//     console.log("Guaranteed S-Rank Character")
//     console.log("Alice: Nhân vật cấp S")
// }


// if(randomNV <=1.6666){
//     if(rate50 <= 50){    
//         console.log("Alice: Nhân vật cấp S")
//     }
//     else{
//         var nvLechrate = [
//             "Lycaon: Nhân vật cấp S",
//             "Rina: Nhân vật cấp S",
//             "Soldier 11: Nhân vật cấp S",
//             "Koleda: Nhân vật cấp S",
//             "Grace: Nhân vật cấp S",
//             "Nekomata: Nhân vật cấp S",
//         ]
//         var randomLechrate = Math.floor(Math.random()*5)
//         console.log(nvLechrate[randomLechrate])
//     }
// }
// else if(randomNV >= 2 && randomNV <=20){
//     var nv4s = [
//         "Anby: Nhân vật cấp A",
//         "Sett: Nhân vật cấp A",
//         "Nicole: Nhân vật cấp A",
//     ]
//     var random4s = Math.floor(Math.random()* 3)
//     console.log(nv4s[random4s])
// }
// else if(randomNV >20 && randomNV <=100){
//     console.log("Kiếm Súng: Vũ khí cấp B")
// }

//     // cập nhật pity hiển thị
//     document.getElementById("pity").textContent = pity;
//     localStorage.setItem("pity", pity);
// }