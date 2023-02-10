class KakaoHelper {
    constructor(data) {
        this.kakao = data;

        // this.domain = process.env.NODE_ENV === "production" ? "http://jayuvillages.com" : "http://localhost:3000";
        this.domain = "http://jayuvillages.com";
    }

    sharePost(item){
        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: item.title,
                description: '',
                imageUrl:
                    item.img ? item.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.id}`,
                    webUrl: `${this.domain}/posts/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/posts/${item.id}`,
                        webUrl: `${this.domain}/posts/${item.id}`,
                    },
                },
            ],
        })
    }

    shareScrap(item){
        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: item.title,
                description: '',
                imageUrl:
                    item.img ? item.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/scraps/${item.id}`,
                    webUrl: `${this.domain}/scraps/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/scraps/${item.id}`,
                        webUrl: `${this.domain}/scraps/${item.id}`,
                    },
                },
            ],
        })
    }
}

export default KakaoHelper;
