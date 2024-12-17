'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useTransitionRouter } from 'next-view-transitions'
import React from "react";

export default function HeroSection() {
  const t = useTranslations('Index');
  const router = useTransitionRouter();
  const [displayText1, setDisplayText1] = useState('');
  const [displayText2, setDisplayText2] = useState('');
  const [displayText3, setDisplayText3] = useState('');
  const [displayText4, setDisplayText4] = useState('');

  useEffect(() => {
    const text1 = t("showPrompt").trim();
    const text2 = t("showPrompt1").trim();
    const text3 = t("showPrompt2").trim();
    const text4 = t("showPrompt3").trim();
    if (displayText1 != '') return;
    let i = -1;
    const timer1 = setInterval(() => {
      if (i < text1.length - 1) {
        i++;
        setDisplayText1(pre => pre + text1[i]);
      } else {
        clearInterval(timer1);
        let j = -1;
        const timer2 = setInterval(() => {
          if (j < text2.length - 1) {
            j++;
            setDisplayText2(prev => prev + text2[j]);
          } else {
            clearInterval(timer2);
            let k = -1;
            const timer3 = setInterval(() => {
              if (k < text3.length - 1) {
                k++;
                setDisplayText3(prev => prev + text3[k]);
              } else {
                clearInterval(timer3);
                let k = -1;
                const timer4 = setInterval(() => {
                  if (k < text4.length - 1) {
                    k++;
                    setDisplayText4(prev => prev + text4[k]);
                  } else {
                    clearInterval(timer4);
                  }
                }, 100);
              }
            }, 100);
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(timer1);
    };
  }, [t]);
  const handleGetStarted = () => {
    router.push('/ai-text-generator');
  };
  

  return (
    <> <style jsx>{`
      @keyframes slideBackground {
        0% { background-position: 0% 0%; }
        100% { background-position: 100% 100%; }
      }
    `}</style>
      <div className="hero bg-base-200 min-h-screen"
        style={{
          backgroundImage: "url(/static/images/hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "top",
          animation: "slideBackground  15s ease-in-out infinite alternate 2s",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content flex-col lg:flex-row-reverse text-neutral-content">
          <div className="mockup-code">
            <pre data-prefix="$" className="text-xs sm:text-sm md:text-base"><code>{displayText1}</code></pre>
            <pre data-prefix=">" className="text-xs sm:text-sm md:text-base text-warning"><code>{displayText2}</code></pre>
            <pre data-prefix=">" className="text-xs sm:text-sm md:text-base text-success"><code>{displayText3}</code></pre>
            <pre data-prefix=">" className="text-xs sm:text-sm md:text-base text-warning"><code>{displayText4}</code></pre>
          </div>
          <div>
            <h1 className="text-5xl font-bold">{t('heroH1')}</h1>
            <p className="py-6 font-mono">
              {t('heroP')}<br /> {t('heroP2')}
            </p>
            <button className="btn btn-primary" onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}