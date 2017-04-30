/**
 * Created by Seattle on 2017/4/30.
 */
var app=new Vue({
    el:'#app',
    data:{
        productList:[],
        totalMoney:0,
        choseAll:false
    },
    filters:{
        doubleMoney:function(n){
            return '￥'+n.toFixed(2)
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.creatView();
        })
    },
    methods:{
        creatView:function () {
            var _this=this;
            this.$http.get("data/cartData.json").then(function (res) {
                _this.productList=res.body.result.list;
            })
        },
        consuleNum:function (type,item) {
            item.productNum+=type;
            item.productNum=item.productNum==0?1:item.productNum;
            this.consuleTotalMoney();
        },
        selectedProduct:function (item) {
            if(typeof item.checked=='undefined'){
                Vue.set(item,'checked',true);
            }else{
                item.checked=!item.checked;
            }
            this.consuleTotalMoney();
        },
        consuleTotalMoney:function () {
            var _this=this;
            _this.totalMoney=0;
            var selectNum=0;
            _this.productList.forEach(function(item){
                if(item.checked){
                    selectNum++;
                    _this.totalMoney+=item.productNum*item.productPrice;
                }
            });
            if(selectNum==_this.productList.length){
                this.choseAll=true;
            }else{
                this.choseAll=false;
            }
        },
        choseAllFun:function () {
            var _this=this;
            _this.totalMoney=0;
            if(this.choseAll){
                _this.productList.forEach(function(item){
                    item.checked=false;
                });
            }else{
                _this.productList.forEach(function(item){
                    item.checked=true;
                    _this.totalMoney+=item.productNum*item.productPrice;
                });
            }
            this.choseAll=!this.choseAll;
        },
        delProduct:function(item){
            if(confirm('确定删除这个产品？')){
                var index=this.productList.indexOf(item);
                this.productList.splice(index,1);
            }
        }
    }
});