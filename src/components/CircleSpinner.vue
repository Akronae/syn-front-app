<script>
export default
{
    name: 'circle-spinner',

    props:
    {
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div class='circle-spinner'>
                <inline-svg class='spinner' fill='inherit' src={require('@/assets/img/circle-spinner.svg')} />
            </div>
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

    watch:
    {
        color ()
        {
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
@import '~@/styles/main.less';
@import '~@/styles/animations.less';

.circle-spinner
{
    fill: blue;
    
    .spinner
    {
        height: 100%;
        animation: rotation .8s linear infinite;

        .OnTablet({
            margin-bottom: 10px;
        });
    }
}
</style>