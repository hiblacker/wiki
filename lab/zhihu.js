var axios = require('axios')

const headers = {
    referer: 'https://www.zhihu.com',
    'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    'x-api-version': '3.0.40',
    'x-zse-93': '101_3_3.0',
    'x-zse-96': '2.0_Trrb3qfdIAmPZpL91xm4Pn6hNmwo9QJlpfte69k=OW5Dhvxayw+7L9YZzoZD/AfX',
    cookies: '_zap=21ef26e1-d6f9-4a47-9aa7-d3c810cd8ead; d_c0="AHBehmgxdRSPTuLtgvJx_MVXVCqDlK8T5Jo=|1644242072"; _9755xjdesxxd_=32; YD00517437729195%3AWM_TID=RFeJfnqM1y1ARQEFVBZ7qO7j37YW85r2; __snaker__id=RxYWGRH3anMPajjj; gdxidpyhxdE=MGuT515g2iG2NfyW2SekUN07XPUip0%2FqBNyNN%5C80s8xYvz3zA6XO9wQslUJcERZ6xgDJ%2FgQmxUggM4RiwtcecmAJn5e6BTZ19IT2idaWLdONWCAp%2FRPq53ziY7Pu%2B9Q3hJ%5CCOmPtMT8Vas5z%5CwnrgRrD2qjxEbLOCyly8RQAuQ9d02P8%3A1665308931818; YD00517437729195%3AWM_NI=jHp%2FfXPs1nLo7RGmmwc3fRFxFnyJauYsORg34sXewswhPGzAKyp2kb94c7GrCtgCWjwYtPemM50BVa%2FYI%2Fwheq%2FQWXAaUNU8Q0BMPXx6z0jKp%2F3Ila0uyd2Wdi8CVZw2WlM%3D; YD00517437729195%3AWM_NIKE=9ca17ae2e6ffcda170e2e6ee8be252b69c8b8acc738e868eb2d85a839a8fadc444b4f5ffb7f93ee9e79c94c92af0fea7c3b92aaa98c0d0e55494adff8fcf65f58e898ef07da1edaab3c57486b2b7abe47f9bad81b3e639f8ad9886f679b5b8a0a8f94b89a7c0d3ea6afbecadd8c67a81aca9a4d662b587bcb1e8678feb00a3d56bed8787d0f664a7afe1b2d65483bf9bafd83493f08eaed354bceab6d1e941b4f1fdaaef6bf4abb785b15da8b7f8a4d552b5ee998dd037e2a3; q_c1=cd516c06554c40e49a38d1d056b17551|1665308083000|1665308083000; z_c0=2|1:0|10:1668237073|4:z_c0|80:MS4xbnE2bEF3QUFBQUFtQUFBQVlBSlZUWWM2VTJRaVJxelpFUjBGUlloRDZfRG5fVGp2T1BJYUN3PT0=|c49fba81b2280d1dc8cddd5dc2ce0601c920d61480aa6e6381378cf198c26233; _xsrf=6f8c2265-9ab6-4dbe-adb1-f259e72b5f33; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1668589868,1668686070,1669195889,1669451969; SESSIONID=nmgldIMOgbxaSRSXam6vTIdHdpkNGO5dTSItpPNCWQJ; JOID=UlsXBkN8RU2v8xWmOnneUa0LktIsESktzp9f6nITJDTJrU_2YwRRz8n4F6Awx1GdFUWhaNkTe1Q3jST4oQCgCQ8=; osd=Vl8cAU94QUao_xGiMX7SVakAld4oFSIqwptb4XUfIDDCqkPyZw9Ww838HKc8w1WWEkmlbNIUd1AzhiP0pQSrDgM=; tst=h; KLBRSID=81978cf28cf03c58e07f705c156aa833|1669953667|1669948081; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1669953668'
}
axios
    .get(
        `https://www.zhihu.com/api/v4/web_moments/evanyou/activities?offset=${1665551412622}&page_num=2`,
        { headers }
    )
    .then(res => {
        console.log(res.data.data)
    })
    .catch(err => {
        console.log(err.response.data.error.message)
    })
