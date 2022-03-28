<script>

export default
{
    name: 'app',

    render () 
    {
        return (
            <div id='app' ref='app'>
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
