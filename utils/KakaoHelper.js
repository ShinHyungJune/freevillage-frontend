class KakaoHelper {
    constructor(data) {
        this.kakao = data;

        // this.domain = process.env.NODE_ENV === "production" ? "http://jayuvillages.com" : "http://localhost:3000";
        this.domain = "https://jayuvillage.com";
    }

    initSharePost(item, container= "#kakao"){
        this.kakao.Link.createDefaultButton({
            container: container,
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

    shareScrapItem(item){
        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: item.post.title,
                description: '',
                imageUrl:
                    item.post.img ? item.post.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.post.id}`,
                    webUrl: `${this.domain}/posts/${item.post.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/posts/${item.post.id}`,
                        webUrl: `${this.domain}/posts/${item.post.id}`,
                    },
                },
            ],
        })
    }

    shareScrapItems(items, nickname){
        if(items.length === 0)
            return alert("최소 1개 이상의 게시글을 선택해주세요.");

        if(items.length === 1)
            return this.shareScrapItem(items[0]);

        if(items.length > 3)
            return alert("최대 3개의 게시글만 공유 가능합니다.");

        let contents = items.map(item => {
            return {
                title: item.post.title,
                description: item.post.created_at,
                imageUrl: item.post.img ? item.post.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.post.id}`,
                    webUrl: `${this.domain}/posts/${item.post.id}`,
                }

            };
        });

        this.kakao.Link.sendDefault({
            objectType: 'list',
            headerTitle: `${nickname}님 자유마을 소식`,
            headerLink: {
                mobileWebUrl: this.domain,
                webUrl: this.domain,
            },
            contents: contents,
            /*buttons: [
                {
                    title: '자세히보기',
                    link: {
                        mobileWebUrl: `${this.domain}/scraps/${item.id}`,
                        webUrl: `${this.domain}/scraps/${item.id}`,
                    },
                },
            ],*/
        })
    }
}

export default KakaoHelper;
