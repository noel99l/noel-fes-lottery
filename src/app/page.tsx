'use client';

import { useState, useEffect } from 'react';
import SlotMachine from '@/components/SlotMachine';
import SelectedBands from '@/components/SelectedBands';
import { Band } from '@/types/band';

export default function Home() {
  const [bands, setBands] = useState<Band[]>([]);
  const [selectedBands, setSelectedBands] = useState<Band[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const maxSelections = 7;

  useEffect(() => {
    // CSVファイルを読み込むか、フォールバックデータを使用
    const fallbackBands: Band[] = [
      { name: '季節のフルーツタルト', concept: '凛として時雨コピーバンド', members: 'Gt/Vo WK Ba/Vo 925 Dr ピエール荒井' },
      { name: '悲しきメイメッソ(仮)', concept: 'ACIDMANのコピバン', members: 'Vo/.Gt.けーすけ Ba.はるぴー Dr.なおぽ' },
      { name: '米子のバンド', concept: '信念(フェイス)のMyGO!!!!!コピバン', members: 'Vo.高松シャンハイ Gt.千早モーリィ Gt.要ドラゴン Ba.長崎がい Dr.椎名レイ' },
      { name: '4にんのおじさん', concept: 'BUMP OF CHICKENのカバーをやります。', members: 'ジュラルGt. チャンダイBa. ちょもDr. うぇるVo.Gt.' },
      { name: '溝ノ口バンド(仮)', concept: '週刊少年漫画アニメOP,ED曲', members: 'さとる(Vo)、けーすけ(Gt)、Dye(Ba)、ねむ(Dr)、柿崎(Key)' },
      { name: 'The Sketchbook', concept: 'スケットダンスの主題歌を主に演奏', members: 'ぽん吉(Vo.Ba.) てぃあら(Gt.) 猫侍(Dr.)' },
      { name: 'ポケカバンド', concept: 'ポケモンタイアップ', members: 'のり太(Vo.)のえる(Gt.)yuri(Gt.)kyo(ba.)ねむ(Dr.)' },
      { name: 'アタガクション', concept: 'サカナクションコピーバンドです！', members: 'Gt.Vo.矢澤がく Gt.よしむら Ba.阿太 key.Nack Dr.そらみ' },
      { name: 'うんちくげぇみんぐ。', concept: 'UNISON SQUARE GARDENカバーバンド', members: 'うぇる　Vo つまみ　Ba げんのしん　Gt グチぐ　Dr' },
      { name: '灼熱nano.RIPE(仮)', concept: 'nano.RIPEの楽曲をエモーショナルにカバー', members: 'ねこり(Vo.Gt.)、ha-tan(Gt.)、さきし(Ba.)、そらみ。(Dr.)' },
      { name: '伝説', concept: 'クリープハイプ', members: 'やまねこvo,gt みずいろgt てぃーけぇba しょうきdr' },
      { name: 'tabun(仮)', concept: 'tacicaのコピーバンド', members: 'Gt, Vo. みずいろ Ba. isuke Dr. ねこり' },
      { name: 'パーシモンサイダー(仮)', concept: 'サイダーガールのコピーをします！', members: 'Vo.アカネ Gtみつき Ba柿崎 Drポット (同期使用予定)' },
      { name: 'ボカロバンド(仮)', concept: 'ボカロコピバン予定です！', members: 'ひのむ(Vo.)、のえる(Gt.)、森田氏(Gt.)、幽助(Ba.)、ととまる(Dr.) Gt.2とKeyは未定' }
    ];
    setBands(fallbackBands);
  }, []);

  const handleBandSelected = (selectedBand: Band) => {
    const newSelectedBands = [...selectedBands, selectedBand];
    setSelectedBands(newSelectedBands);
    
    // 7つ選出完了時のSP自動スクロール
    if (newSelectedBands.length === maxSelections && window.innerWidth <= 768) {
      setTimeout(() => {
        const selectedSection = document.querySelector('.right-section');
        if (selectedSection) {
          selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1500);
    }
    
    // バンドリストの更新を遅延させて、ルーレット表示を維持
    setTimeout(() => {
      setBands(prev => prev.filter(band => band.name !== selectedBand.name));
    }, 100);
  };

  const resetLottery = () => {
    setSelectedBands([]);
    setBands([
      { name: '季節のフルーツタルト', concept: '凛として時雨コピーバンド', members: 'Gt/Vo WK Ba/Vo 925 Dr ピエール荒井' },
      { name: '悲しきメイメッソ(仮)', concept: 'ACIDMANのコピバン', members: 'Vo/.Gt.けーすけ Ba.はるぴー Dr.なおぽ' },
      { name: '米子のバンド', concept: '信念(フェイス)のMyGO!!!!!コピバン', members: 'Vo.高松シャンハイ Gt.千早モーリィ Gt.要ドラゴン Ba.長崎がい Dr.椎名レイ' },
      { name: '4にんのおじさん', concept: 'BUMP OF CHICKENのカバーをやります。', members: 'ジュラルGt. チャンダイBa. ちょもDr. うぇるVo.Gt.' },
      { name: '溝ノ口バンド(仮)', concept: '週刊少年漫画アニメOP,ED曲', members: 'さとる(Vo)、けーすけ(Gt)、Dye(Ba)、ねむ(Dr)、柿崎(Key)' },
      { name: 'The Sketchbook', concept: 'スケットダンスの主題歌を主に演奏', members: 'ぽん吉(Vo.Ba.) てぃあら(Gt.) 猫侍(Dr.)' },
      { name: 'ポケカバンド', concept: 'ポケモンタイアップ', members: 'のり太(Vo.)のえる(Gt.)yuri(Gt.)kyo(ba.)ねむ(Dr.)' },
      { name: 'アタガクション', concept: 'サカナクションコピーバンドです！', members: 'Gt.Vo.矢澤がく Gt.よしむら Ba.阿太 key.Nack Dr.そらみ' },
      { name: 'うんちくげぇみんぐ。', concept: 'UNISON SQUARE GARDENカバーバンド', members: 'うぇる　Vo つまみ　Ba げんのしん　Gt グチぐ　Dr' },
      { name: '灼熱nano.RIPE(仮)', concept: 'nano.RIPEの楽曲をエモーショナルにカバー', members: 'ねこり(Vo.Gt.)、ha-tan(Gt.)、さきし(Ba.)、そらみ。(Dr.)' },
      { name: '伝説', concept: 'クリープハイプ', members: 'やまねこvo,gt みずいろgt てぃーけぇba しょうきdr' },
      { name: 'tabun(仮)', concept: 'tacicaのコピーバンド', members: 'Gt, Vo. みずいろ Ba. isuke Dr. ねこり' },
      { name: 'パーシモンサイダー(仮)', concept: 'サイダーガールのコピーをします！', members: 'Vo.アカネ Gtみつき Ba柿崎 Drポット (同期使用予定)' },
      { name: 'ボカロバンド(仮)', concept: 'ボカロコピバン予定です！', members: 'ひのむ(Vo.)、のえる(Gt.)、幽助(Ba.)、ととまる(Dr.) Gt.2とKeyは未定' }
    ]);
  };

  return (
    <div className="container">
      <div className="header-section">
        <div className="header-left">
          <img src="/images/noel_fes_logo.png" alt="のえるフェス ロゴ" className="logo" />
        </div>
        <div className="header-right">
          <div className="event-info">
            <p className="event-volume">vol.5</p>
            <p className="event-date">2026/4/4(土)</p>
            <p className="event-venue">大塚 Deepa</p>
          </div>
        </div>
      </div>
      
      <div className="main-layout">
        <div className="left-section">
          <h1>出演バンド抽選</h1>
          <SlotMachine
            bands={bands}
            onBandSelected={handleBandSelected}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            selectedBands={selectedBands}
            maxSelections={maxSelections}
          />
        </div>
        
        <div className="right-section">
          <h1>選出バンド</h1>
          <SelectedBands
            selectedBands={selectedBands}
            maxSelections={maxSelections}
          />
          
          {(selectedBands.length >= maxSelections || bands.length === 0) && (
            <button onClick={resetLottery} className="reset-btn">
              リセット
            </button>
          )}
        </div>
      </div>
      
      <div className="event-details">
        <div className="event-content">
          <div className="event-info-detail">
            <div className="info-item">
              のえるフェスvol.5
            </div>
            <div className="info-item">
              2026/4/4(土)<br />OPEN 14:00 / START 14:30
            </div>
            <div className="info-item">
              大塚 Deepa <a href="http://otsukadeepa.jp/" target="_blank" rel="noopener noreferrer">(公式サイト)</a>
            </div>
            <div className="info-item">
              前売 ¥3,000 / 当日 ¥3,500(予定)<br />+1D
            </div>
            <div className="info-item">
              配信 ¥2,000(予定)
            </div>
          </div>
          <div className="map-container desktop-map">
            <iframe
              src="https://www.google.com/maps?q=大塚Deepa+東京都豊島区南大塚3-49-10&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="map-container mobile-map">
          <iframe
            src="https://www.google.com/maps?q=大塚Deepa+東京都豊島区南大塚3-49-10&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}