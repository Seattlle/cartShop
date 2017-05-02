/**
 * Created by Seattle on 2017/5/2.
 */
new Vue({
    el:'#app',
    data:{
        addressList:[]
    },
    mounted:function () {
        this.$nextTick(function () {
            this.creatView();
        })
    },
    methods:{
        creatView:function () {
            this.$http.get("data/addressData.json").then(res=>{
                this.addressList=res.body.result.list;
            })
        },
        setDetault:function (address) {
            this.addressList.forEach(item=>{
                item.isDefault=false;
            });
            address.isDefault=true;
        },
        del:function (index) {
            if(confirm("确定删除这条地址？")){
                this.addressList.splice(index,1);
            }
        },
        chose:function (item) {
            this.addressList.forEach(address=>{
                if(address!=item){
                    if(typeof address.selected=="undefined"){
                        Vue.set(address,"selected",false);
                    }else{
                        address.selected=false;
                    }
                }
            });
            if(typeof item.selected=="undefined"){
                Vue.set(item,"selected",true);
            }else{
                item.selected=!item.selected;
            }
        }
    }
});