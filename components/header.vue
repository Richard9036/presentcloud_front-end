<template>
<div class="header">
    <el-row type="flex" justify="space-between" class='main'>
        <div class='logo'>
            <nuxt-link to="/">
                <img src="@/components/logo.png" alt="">
            </nuxt-link>
        </div>

        <el-row type='flex' class="navs">
            <nuxt-link to='/'>系统首页</nuxt-link>
            <nuxt-link to='/user'>用户管理</nuxt-link>
            <nuxt-link to='/menu'>菜单管理</nuxt-link>
            <nuxt-link to='/role'>角色管理</nuxt-link>
            <nuxt-link to='/authority'>权限管理</nuxt-link>
            <nuxt-link to='/data'>数据管理</nuxt-link>
            <nuxt-link to='/about'>关于我们</nuxt-link>
        </el-row>
        <nuxt-link to='/login'>登录</nuxt-link>

    </el-row>
    
</div>


</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.header{
    height:60px;
    line-height:60px;
    border-bottom: 1px #ddd solid ;
    box-shadow: 0 2px 2px #eee;

    .main{
        width:1000px;
        margin:0 auto;   
     .logo{
         margin-top:1px;
         margin-right: 20px;
        img{
        display: block;


        }
    }


    }

    .navs{
        flex:1;
        a{
            display: block;
            padding:0 20px;
            height:60px;
            box-sizing: border-box;

           &:hover{
                color: #409eff;
                border-bottom: 5px #409eff solid;

            }

            &:active{
                    background:#409eff;
                    color:#fff;
            }
        }   
        .nuxt-link-exact-active{
        background:#409eff;
        color:#fff !important;
    }


    }


}


</style>

