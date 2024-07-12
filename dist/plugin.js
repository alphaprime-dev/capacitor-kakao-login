var Capacitor3KakaoLogin = (function (exports, core) {
    'use strict';

    const Capacitor3KakaoLogin = core.registerPlugin('Capacitor3KakaoLogin', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.Capacitor3KakaoLoginWeb()),
    });

    class Capacitor3KakaoLoginWeb extends core.WebPlugin {
        initializeKakao(options) {
            return new Promise(resolve => {
                if (!this.web_key) {
                    this.web_key = options.web_key;
                    Kakao.init(this.web_key);
                }
                resolve({ value: 'done' });
            });
        }
        //웹 카카오 로그인
        kakaoLogin() {
            return new Promise((resolve, reject) => {
                if (!this.web_key) {
                    reject('kakao_sdk_not_initialzed');
                }
                const KakaoSdk = Kakao;
                KakaoSdk.Auth.login({
                    success: function (authObj) {
                        let { access_token } = authObj;
                        resolve({ value: access_token });
                    },
                    fail: function (err) {
                        console.error(err);
                        reject(err);
                    },
                });
            });
        }
        //웹 로그아웃
        kakaoLogout() {
            return new Promise((resolve, reject) => {
                if (!this.web_key) {
                    reject('kakao_sdk_not_initialzed');
                }
                const KakaoSdk = Kakao;
                KakaoSdk.Auth.logout();
                resolve({ value: 'done' });
            });
        }
        //unlink
        kakaoUnlink() {
            return new Promise((resolve, reject) => {
                if (!this.web_key) {
                    reject('kakao_sdk_not_initialzed');
                }
                const KakaoSdk = Kakao;
                KakaoSdk.API.request({
                    url: '/v1/user/unlink',
                    success: function (response) {
                        console.log(response);
                        resolve({ value: 'done' });
                    },
                    fail: function (error) {
                        console.log(error);
                        reject(error);
                    },
                });
            });
        }
        //message
        sendLinkFeed(options) {
            return new Promise((resolve, reject) => {
                if (!this.web_key) {
                    reject('kakao_sdk_not_initialzed');
                }
                const KakaoSdk = Kakao;
                KakaoSdk.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: options.title,
                        description: options.description,
                        imageUrl: options.image_url,
                        link: {
                            mobileWebUrl: options.image_link_url,
                        },
                    },
                    buttons: [
                        {
                            title: options.button_title,
                            link: {
                                mobileWebUrl: options.image_link_url,
                            },
                        },
                    ],
                    callback: function () {
                        resolve({ value: 'done' });
                    },
                });
            });
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Capacitor3KakaoLoginWeb: Capacitor3KakaoLoginWeb
    });

    exports.Capacitor3KakaoLogin = Capacitor3KakaoLogin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
