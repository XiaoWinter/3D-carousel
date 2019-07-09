(()=>{
    document.addEventListener('DOMContentLoaded',function(){
        //业务

        //获取轮播图小点
        let icons = document.querySelectorAll('.icon-list .icon-item');
        //所有的轮播图
        let playitems = document.querySelectorAll('.play-list .play-item');
        //轮播容器
        let playWrap = document.querySelector('.play-wrapper');

        //当前显示的页面
        let showIndex = 0;
        //将要显示的也main
        let playIndex = 0;
        //自动轮播
        let autoplay = true;
        //自动轮播定时器句柄
        let lunboId;


        /**
         * 点击小点切换轮播图
         */
        icons.forEach(function (item,index) {
            item[index] = index;
            //获取当前为active的项目
            item.addEventListener('mouseenter',function () {

                playIndex = index;
                playlunbo();

            });
        });
        //调用自动轮播方法
        autolunbo();

        /**
         * 鼠标在轮播图上停止轮播
         */
        playWrap.addEventListener('mouseenter',function () {
            autoplay = false;
            clearInterval(lunboId);
        });

        playWrap.addEventListener('mouseleave',function () {
            autolunbo();
        });


        /**
         * 自动轮播的方法，同时保存lunboId
         */
        function autolunbo(){
            autoplay = true;
            //自动轮播
            lunboId = setInterval(function () {
                playIndex++;
                playIndex = playIndex > 3 ? 0:playIndex;
                // console.log(playIndex);
                playlunbo();
            },3000);
        }

        /**
         * 轮播图播放方法
         */
        function playlunbo() {
            if (playIndex > showIndex||autoplay){
                playitems[playIndex].className = 'play-item right-showmove';
                playitems[showIndex].className = 'play-item  right-hiddenmove';
            }else if(playIndex < showIndex){
                playitems[playIndex].className = 'play-item left-showmove';
                playitems[showIndex].className = 'play-item  left-hiddenmove';
            }

            icons.forEach(function (item,index) {
                item.classList.remove('active');
                if (index === playIndex){
                    item.classList.add('active');
                }
            });

            showIndex = playIndex;
        }
    });
})();