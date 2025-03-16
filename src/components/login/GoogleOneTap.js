"use client"

import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function GoogleOneTap() {
    const { data: session } = useSession();
    
    useEffect(() => {

        if (!window.google) return;
  
        // 如果用户已登录，不显示 One Tap
        if (session?.user) return;
        
        // 加载onetap的脚本
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = initializeOneTap;
        };
        

        const initializeOneTap = () => {
            if (window.google && !session) {
                window.google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,  
                    callback: handleOneTapResponse,	// 用户点击onetap 登陆或其他动作的回调函数
                    // 下面是一些配置，打通流程话，先都false就好了，防止fedcm报错、自动登陆等问题
                    auto_select: false,				
                    cancel_on_tap_outside: false,
                    use_fedcm_for_prompt: false
                });
                
                // 这里是显示one tap 不显示的原因，比如你google本身就没有登陆google账号
                window.google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        console.log('One Tap 不显示:', notification.getNotDisplayedReason() || notification.getSkippedReason());
                    }
                });
            }
        };

        loadGoogleScript();


        // 用户点击onetap 登陆或其他动作的回调函数
        const handleOneTapResponse = async (response) => {
            if (response.credential) {	// 如果获取到了credential，表示用户的信息，含有google邮箱、google用户名信息等
                await signIn('google-one-tap', { 			// 给到后端进行处理，下一步
                    credential: response.credential,
                    redirect: false 
                });
            }
        };
        
        // 清理函数，非业务逻辑。
        return () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.cancel();
            }
        };
    }, [session]);
    
    return null;
} 