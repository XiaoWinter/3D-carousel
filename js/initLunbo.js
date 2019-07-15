(()=>{
    document.addEventListener('DOMContentLoaded',function(){
        let lunbo = document.querySelector('.lunbo');
        // pcLunbo(lunbo,'icon-list');
        pcLunbo(lunbo,{autoplay:true,iconList:'icon-list'});
        //业务
        /**
         *
         * @param lunbo 轮播图容器 参数必选
         * @param options ：{ 参数可选
         *     iconList ：小原点类名 字符串
         *     autoplay ：是否自动播放 布尔值 默认false
         *     transition ： 轮播图过渡时间 单位毫秒 整数 默认 1000
         *     delay ： 轮播图延时 单位毫秒 整数 默认3000
         * }
         */
        function pcLunbo(lunbo,options) {

            //所有的轮播图
            let playitems = lunbo.querySelectorAll('.play-list .play-item');
            let itemLength = playitems.length;
            //轮播容器
            let playWrap = lunbo.querySelector('.play-wrapper');

            //
            //轮播小点
            let iconList = options.iconList;
            //自动轮播标志位
            let autoplay = options.autoplay;
            //轮播图过渡的时间
            let transition = options.transition || 1000;
            //轮播图的延时
            let delay = options.delay || 3000;

            let icons;
            let iconwrap;
            if (iconList) {
                iconwrap = lunbo.querySelector('.'+iconList);
                iconinner = '';
                for (let i = 0; i < itemLength; i++) {
                    iconinner += `<div class="icon-item"></div>`;
                }
                iconwrap.innerHTML = iconinner;
                icons = lunbo.querySelectorAll('.'+iconList +' .icon-item');
            }



            //当前显示的页面
            let showIndex = 0;
            //将要显示的也main
            let playIndex = 0;
            //自动轮播定时器句柄
            let lunboId;

            setTransition(transition);


            if (iconList) {
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
            }

            //调用自动轮播方法
            autolunbo(autoplay,delay);

            /**
             * 鼠标在轮播图上停止轮播
             */
            playWrap.addEventListener('mouseenter',function () {
                if (autoplay)
                    clearInterval(lunboId);
            });

            playWrap.addEventListener('mouseleave',function () {
                if (autoplay)
                    autolunbo(autoplay,delay);
            });


            /**
             * 自动轮播的方法，同时保存lunboId
             */
            function autolunbo(autoplay,delay){
                if (autoplay){
                    //自动轮播
                    lunboId = setInterval(function () {
                        playIndex++;
                        playIndex = playIndex > 3 ? 0:playIndex;
                        // console.log(playIndex);
                        playlunbo();
                    },delay);
                }

            }

            /**
             * 轮播图播放方法
             */
            function playlunbo() {

                //解决多重轮播的bug
                setTransition(0)
                playitems.forEach(function (item,index) {
                    if (index === showIndex || index === playIndex){
                        item.style.animationDuration = transition+'ms';
                    }
                });

                if (playIndex > showIndex||autoplay){
                    playitems[playIndex].className = 'play-item right-showmove';
                    playitems[showIndex].className = 'play-item  right-hiddenmove';
                }else if(playIndex < showIndex){
                    playitems[playIndex].className = 'play-item left-showmove';
                    playitems[showIndex].className = 'play-item  left-hiddenmove';
                }
                if (iconList){
                    icons.forEach(function (item,index) {
                        item.classList.remove('active');
                        if (index === playIndex){
                            item.classList.add('active');
                        }
                    });
                }
                showIndex = playIndex;
            }

            /**
             * 设置轮播图过渡时间
             * @param transition
             */
            function setTransition(transition){
                playitems.forEach(function (item) {
                    item.style.animationDuration = transition+'ms';
                })
            }
        }

    });
})();