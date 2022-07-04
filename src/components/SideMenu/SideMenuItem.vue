<script>
export default
{
    name: 'side-menu-item',

    props:
    {
        icon: { required: true },
        name: { required: true, type: String },
        id: { type: String },
        path: { type: String }
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div class='side-menu-item' on-click={this.onClicked}>
                <inline-svg src={this.icon} class='item-icon' />
                <div class='item-name'>{ this.name }</div>
            </div>
        )
    },

    mounted ()
    {
    },

    data () 
    {
        return {
            isActive: false
        }
    },

    computed:
    {
    },

    watch:
    {
        isActive ()
        {
            if (this.isActive) this.$el.classList.add('active')
            else this.$el.classList.remove('active')
        }
    },

    methods:
    {
        onClicked (e)
        {
            this.$emit('click', e)
        }
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.side-menu-item
{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 20px;
    margin: 0 10px;
    margin-top: 8px;
    border-radius: 5px;
    cursor: pointer;

    &:hover
    {
        background-color: var(--theme-border-color-extra-light);
    }

    &.active
    {
        background-color: var(--theme-border-color);
    }

    > .item-icon
    {
        .WidthHeight(20px);
        fill: var(--theme-background-text-color-heavy);
    }

    > .item-name
    {
        margin-left: 20px;
        font-weight: 500;
    }
}
</style>