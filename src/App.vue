<script>
import ResponsiveMenu from '@/components/ResponsiveMenu/ResponsiveMenu'
import ResponsiveMenuItem from '@/components/ResponsiveMenu/ResponsiveMenuItem'

export default
{
    name: 'app',

    render () 
    {
        return (
            <div id='app' ref='app'>
                <ResponsiveMenu on-item-selected={i => this.$router.push(i.path)}>
                    <ResponsiveMenuItem icon={require('@/assets/img/translate.svg')} name='Auto Translate' path='/' />
                    <ResponsiveMenuItem icon={require('@/assets/img/book.svg')} name='Hard Coded' path='/hardcoded' />
                </ResponsiveMenu>
                <keep-alive>
                    <router-view ref='router' />
                </keep-alive>
            </div>
        );
    },

    created ()
    {
    },

    mounted ()
    {
        this.$router.afterEach((to, from, next) =>
        {
            setTimeout(() => window.scrollTo(0, 1), 50)
            setTimeout(() => window.scrollTo(0, 0), 100)
        });
    },

    data ()
    {
        return {
        }
    },

    computed:
    {
    },

    methods:
    {
    },
    
    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/app.less';

#app
{
}
</style>
