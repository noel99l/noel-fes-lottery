class LotteryApp {
    constructor() {
        this.bands = [];
        this.selectedBands = [];
        this.isRunning = false;
        this.maxSelections = 7;
        
        this.initializeElements();
        this.loadBands();
        this.bindEvents();
    }
    
    initializeElements() {
        this.slot = document.getElementById('slot');
        this.slotReel = document.getElementById('slotReel');
        this.startBtn = document.getElementById('startLottery');
        this.resetBtn = document.getElementById('resetLottery');
        this.selectedBandsContainer = document.getElementById('selectedBands');
        this.counter = document.getElementById('counter');
        this.remainingCount = document.getElementById('remainingCount');
        this.currentPosition = 0;
        this.itemHeight = 100;
    }
    
    async loadBands() {
        try {
            const response = await fetch('「のえるフェスvol.5」バンドエントリーフォーム（回答） - フォームの回答 1.csv');
            const csvText = await response.text();
            this.parseCsv(csvText);
        } catch (error) {
            console.error('CSVファイルの読み込みに失敗しました:', error);
            // フォールバック用のデータ
            this.bands = [
                { name: '季節のフルーツタルト', concept: '凛として時雨コピーバンド' },
                { name: '悲しきメイメッソ(仮)', concept: 'ACIDMANのコピバン' },
                { name: '米子のバンド', concept: '信念(フェイス)のMyGO!!!!!コピバン' },
                { name: '4にんのおじさん', concept: 'BUMP OF CHICKENのカバーをやります。' },
                { name: '溝ノ口バンド(仮)', concept: '週刊少年漫画アニメOP,ED曲' },
                { name: 'The Sketchbook', concept: 'スケットダンスの主題歌を主に演奏' },
                { name: 'ポケカバンド', concept: 'ポケモンタイアップ' },
                { name: 'アタガクション', concept: 'サカナクションコピーバンドです！' },
                { name: 'うんちくげぇみんぐ。', concept: 'UNISON SQUARE GARDENカバーバンド' },
                { name: '灼熱nano.RIPE(仮)', concept: 'nano.RIPEの楽曲をエモーショナルにカバー' },
                { name: '伝説', concept: 'クリープハイプ' },
                { name: 'tabun(仮)', concept: 'tacicaのコピーバンド' },
                { name: 'パーシモンサイダー(仮)', concept: 'サイダーガールのコピーをします！' },
                { name: 'ボカロバンド(仮)', concept: 'ボカロコピバン予定です！' }
            ];
        }
        this.createReel();
        this.updateRemainingCount();
    }
    
    parseCsv(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        this.bands = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = this.parseCsvLine(lines[i]);
                if (values.length >= 6) {
                    this.bands.push({
                        name: values[2], // バンド名
                        concept: values[5] // コンセプト
                    });
                }
            }
        }
    }
    
    parseCsvLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startLottery());
        this.resetBtn.addEventListener('click', () => this.resetLottery());
    }
    
    createReel() {
        this.slotReel.innerHTML = '';
        const reelBands = [...this.bands, ...this.bands, ...this.bands]; // 3回繰り返し
        
        reelBands.forEach((band, index) => {
            const item = document.createElement('div');
            item.className = 'slot-item';
            item.textContent = band.name;
            item.style.top = `${index * this.itemHeight}px`;
            this.slotReel.appendChild(item);
        });
        
        this.updateReelPosition(0);
    }
    
    updateReelPosition(position) {
        this.slotReel.style.transform = `translateY(${-position}px)`;
        
        // 中央、上、下のアイテムにクラスを適用
        const items = this.slotReel.querySelectorAll('.slot-item');
        items.forEach((item, index) => {
            item.className = 'slot-item';
            const itemTop = index * this.itemHeight - position;
            
            if (itemTop >= 90 && itemTop <= 110) {
                item.classList.add('center');
            } else if (itemTop >= -10 && itemTop <= 90) {
                item.classList.add('above');
            } else if (itemTop >= 110 && itemTop <= 210) {
                item.classList.add('below');
            }
        });
    }
    
    async startLottery() {
        if (this.isRunning || this.selectedBands.length >= this.maxSelections || this.bands.length === 0) {
            return;
        }
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        
        // 最終的に選択されるバンドのインデックスを決定
        const finalIndex = Math.floor(Math.random() * this.bands.length);
        const totalSpins = this.bands.length * 2 + finalIndex; // 2周 + 最終位置
        
        // スピニングアニメーション
        const spinDuration = 4000; // 4秒
        const totalSteps = 80; // より滑らかに
        let currentStep = 0;
        
        const spinAnimation = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            
            // イージング関数（最初は速く、最後は遅く）
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentPosition = easeOut * totalSpins * this.itemHeight;
            
            this.updateReelPosition(currentPosition);
            
            if (currentStep >= totalSteps) {
                clearInterval(spinAnimation);
                this.finalizeLottery(finalIndex);
            }
        }, spinDuration / totalSteps);
    }
    
    finalizeLottery(selectedIndex) {
        const selectedBand = this.bands[selectedIndex];
        
        // 選択されたバンドを配列に追加
        this.selectedBands.push(selectedBand);
        
        // 選択されたバンドを利用可能リストから削除
        this.bands.splice(selectedIndex, 1);
        
        setTimeout(() => {
            this.addSelectedBandToDisplay(selectedBand);
            this.updateCounters();
            this.resetForNext();
        }, 1000);
    }
    
    addSelectedBandToDisplay(band) {
        const bandCard = document.createElement('div');
        bandCard.className = 'band-card';
        bandCard.innerHTML = `
            <h3>${band.name}</h3>
            <p>${band.concept}</p>
        `;
        this.selectedBandsContainer.appendChild(bandCard);
    }
    
    updateCounters() {
        this.counter.textContent = this.selectedBands.length;
        this.updateRemainingCount();
    }
    
    updateRemainingCount() {
        this.remainingCount.textContent = this.bands.length;
    }
    
    resetForNext() {
        this.isRunning = false;
        
        if (this.selectedBands.length >= this.maxSelections || this.bands.length === 0) {
            this.startBtn.style.display = 'none';
            this.resetBtn.style.display = 'inline-block';
        } else {
            this.createReel(); // リールを再作成
            this.startBtn.disabled = false;
        }
    }
    
    resetLottery() {
        // 全てリセット
        this.selectedBands = [];
        this.selectedBandsContainer.innerHTML = '';
        this.counter.textContent = '0';
        this.slotContent.textContent = '抽選開始';
        
        // ボタンの状態をリセット
        this.startBtn.style.display = 'inline-block';
        this.startBtn.disabled = false;
        this.resetBtn.style.display = 'none';
        
        // バンドデータを再読み込み
        this.loadBands();
    }
}

// アプリケーション開始
document.addEventListener('DOMContentLoaded', () => {
    new LotteryApp();
});