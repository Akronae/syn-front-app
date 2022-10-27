<script>
export default
{
    name: 'side-menu-item-separator',

    props:
    {
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div class='side-menu-separator' />
        )
    },

    mounted ()
    {
    },

    data () 
    {
        return {
        }
    },

    computed:
    {
    },

    watch:
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
@import '~@/styles/main.less';

.side-menu-separator
{
    margin-top: 2px;
    border-bottom: 1px solid var(--theme-border-color);
}
</style>