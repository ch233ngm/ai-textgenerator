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
    const text1 = t("showPrompt");
    const text2 = t("showPrompt1");
    const text3 = t("showPrompt2");
    const text4 = t("showPrompt3");
    if (displayText1 != '') return;
    let i = 0;
    const timer1 = setInterval(() => {
      if (i < text1.length - 1) {
        setDisplayText1(prev => prev + text1[i]);
        i++;
      } else {
        clearInterval(timer1);
        let j = 0;
        const timer2 = setInterval(() => {
          if (j < text2.length - 1) {
            setDisplayText2(prev => prev + text2[j]);
            j++;
          } else {
            clearInterval(timer2);
            let k = 0;
            const timer3 = setInterval(() => {
              if (k < text3.length - 1) {
                setDisplayText3(prev => prev + text3[k]);
                k++;
              } else {
                clearInterval(timer3);
                let k = 0;
                const timer4 = setInterval(() => {
                  if (k < text4.length - 1) {
                    setDisplayText4(prev => prev + text4[k]);
                    k++;
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
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const height = navbar.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height-4}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };

  }, []);

  return (
    <div className="hero bg-base-200 min-h-[calc(100vh-var(--navbar-height))]"
    style={{
      backgroundImage: "url(/static/images/hero.webp)",
    }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col lg:flex-row-reverse text-neutral-content">
        <div className="mockup-code">
          <pre data-prefix="$"><code>{displayText1}</code></pre>
          <pre data-prefix=">" className="text-warning"><code>{displayText2}</code></pre>
          <pre data-prefix=">" className="text-success"><code>{displayText3}</code></pre>
          <pre data-prefix=">" className="text-warning"><code>{displayText4}</code></pre>
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
  );
}