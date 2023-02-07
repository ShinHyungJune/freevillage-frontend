class KakaoHelper {
    constructor(data) {
        this.kakao = data;
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
                    mobileWebUrl: `http://jayuvillages.com/posts/${item.id}`,
                    webUrl: `http://jayuvillages.com/posts/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `http://jayuvillages.com/posts/${item.id}`,
                        webUrl: `http://jayuvillages.com/posts/${item.id}`,
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
                    mobileWebUrl: `http://jayuvillages.com/scraps/${item.id}`,
                    webUrl: `http://jayuvillages.com/scraps/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `http://jayuvillages.com/scraps/${item.id}`,
                        webUrl: `http://jayuvillages.com/scraps/${item.id}`,
                    },
                },
            ],
        })
    }
}

export default KakaoHelper;
